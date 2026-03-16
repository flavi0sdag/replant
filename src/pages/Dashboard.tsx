import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Trophy,
  Leaf,
  Zap,
  Target,
  Gift,
  TrendingUp,
  Award,
  Sparkles,
  ShoppingBag,
  Users,
  Calendar,
  CheckCircle2,
  Lock,
  MapPin,
  QrCode,
  Package,
  CreditCard,
  MessageCircle,
  Send,
  Mail,
  Droplets,
  Star,
  ArrowUp,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [userXP, setUserXP] = useState(1250);
  const [userLevel, setUserLevel] = useState(5);
  const [userPoints, setUserPoints] = useState(3420);
  const [deliveryCode, setDeliveryCode] = useState("");
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const xpToNextLevel = 500;
  const xpProgress = (userXP % xpToNextLevel) / xpToNextLevel * 100;

  // Dynamic stats with animation
  const [animatedStats, setAnimatedStats] = useState({
    kgRecycled: 47.8,
    co2Saved: 95.6
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        kgRecycled: Math.round((prev.kgRecycled + (Math.random() * 0.2)) * 10) / 10,
        co2Saved: Math.round((prev.co2Saved + (Math.random() * 0.4)) * 10) / 10
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Map Modal State
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<typeof collectionPoints[0] | null>(null);

  // Purchase Modal State
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof realProducts[0] | null>(null);
  const [purchaseData, setPurchaseData] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  // Assistant State
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Olá! 🌱 Sou o assistente RePlant. Posso te ajudar a saber quais **plásticos** podem ser reciclados conosco. Pergunte-me qualquer coisa!" }
  ]);

  // Mock data
  const userStats = {
    recyclablesRegistered: 156,
    rankPosition: 47,
    totalUsers: 10234
  };

  const missions = [
    {
      id: 1,
      title: "Registre 5 plásticos hoje",
      description: "Escaneie e registre 5 itens plásticos no ponto de coleta mais próximo. Garrafas PET, potes e embalagens contam!",
      progress: 3,
      total: 5,
      xpReward: 50,
      pointsReward: 100,
      completed: false,
      icon: Target,
      difficulty: "Fácil"
    },
    {
      id: 2,
      title: "Visite um ponto de coleta",
      description: "Entregue seus plásticos em um ponto parceiro e ganhe pontos extras. Lembre-se de pegar seu código de entrega!",
      progress: 0,
      total: 1,
      xpReward: 100,
      pointsReward: 200,
      completed: false,
      icon: CheckCircle2,
      difficulty: "Médio"
    },
    {
      id: 3,
      title: "Compartilhe seu progresso",
      description: "Inspire outros mostrando seu impacto ambiental nas redes sociais. Use #RePlant para conectar com a comunidade!",
      progress: 0,
      total: 1,
      xpReward: 30,
      pointsReward: 50,
      completed: false,
      icon: Users,
      difficulty: "Fácil"
    },
    {
      id: 4,
      title: "Recicle 5kg de plástico esta semana",
      description: "Acumule 5kg de plástico reciclável durante a semana. Garrafas PET, potes e embalagens contam!",
      progress: 2.3,
      total: 5,
      xpReward: 150,
      pointsReward: 300,
      completed: false,
      icon: TrendingUp,
      difficulty: "Difícil"
    }
  ];

  const badges = [
    { id: 1, name: "Eco Iniciante", icon: "🌱", unlocked: true, description: "Parabéns por começar sua jornada sustentável! Este badge marca o início de grandes mudanças." },
    { id: 2, name: "Reciclador de Plástico", icon: "♻️", unlocked: true, description: "Você reciclou mais de 10kg de plásticos. Continue assim para desbloquear mais conquistas!" },
    { id: 3, name: "Protetor Verde", icon: "🛡️", unlocked: true, description: "Completou 10 missões e provou seu compromisso com o meio ambiente. Você é um verdadeiro protetor!" },
    { id: 4, name: "Guardião da Terra", icon: "🌍", unlocked: false, description: "Recicle 50kg de plástico para se tornar um Guardião da Terra. Faltam apenas 2.2kg!" },
    { id: 5, name: "Lenda Sustentável", icon: "👑", unlocked: false, description: "O badge mais raro! Alcance o top 10 do ranking e recicle 100kg para conquistá-lo." },
  ];

  const ranking = [
    { position: 1, name: "Carlos Mendes", points: 12450, avatar: "👨", medal: "🥇" },
    { position: 2, name: "Ana Paula", points: 11230, avatar: "👩", medal: "🥈" },
    { position: 3, name: "João Silva", points: 9870, avatar: "👨", medal: "🥉" },
    { position: 45, name: "Ricardo Santos", points: 3650, avatar: "👨" },
    { position: 46, name: "Mariana Costa", points: 3510, avatar: "👩" },
    { position: 47, name: "Você", points: userPoints, avatar: "🎯", isUser: true },
    { position: 48, name: "Pedro Oliveira", points: 3280, avatar: "👨" },
    { position: 49, name: "Juliana Alves", points: 3120, avatar: "👩" },
  ];

  const storeItems = [
    { id: 1, name: "Badge Especial: Lenda Verde", description: "Mostre que você é uma lenda sustentável", price: 1000, icon: "👑", category: "Badge" },
    { id: 2, name: "Skin de Árvore Dourada", description: "Deixe sua árvore brilhando", price: 500, icon: "✨", category: "Skin" },
    { id: 3, name: "Booster de XP 2x", description: "Ganhe XP em dobro por 7 dias", price: 750, icon: "⚡", category: "Boost" },
    { id: 4, name: "Fonte Decorativa", description: "Adicione uma fonte ao seu jardim", price: 300, icon: "⛲", category: "Decoração" },
    { id: 5, name: "Banco de Parque", description: "Descanse no seu jardim virtual", price: 200, icon: "🪑", category: "Decoração" },
    { id: 6, name: "Borboletas Animadas", description: "Traga vida ao seu jardim", price: 400, icon: "🦋", category: "Decoração" }
  ];

  const realProducts = [
    { id: 101, name: "Vaso Decorativo PET", description: "Vaso feito de garrafas PET recicladas, pintado à mão", price: 45.90, image: "🪴", category: "Vasos", artisan: "Maria Artesanatos" },
    { id: 102, name: "Vaso Suspenso Macramê", description: "Vaso suspenso com cordas recicladas e acabamento rústico", price: 68.00, image: "🌿", category: "Vasos", artisan: "EcoArte Studio" },
    { id: 103, name: "Cachepot de Pneu", description: "Cachepot feito de pneu reciclado, resistente e durável", price: 89.90, image: "🌺", category: "Vasos", artisan: "Verde Vida" },
    { id: 104, name: "Vaso Autoirrigável", description: "Vaso inteligente feito com plástico reciclado", price: 55.00, image: "💧", category: "Vasos", artisan: "TechRecicla" },
    { id: 105, name: "Kit 3 Mini Vasos", description: "Conjunto de mini vasos em plástico reciclado prensado", price: 35.00, image: "🌱", category: "Vasos", artisan: "Papel Verde" },
    { id: 106, name: "Vaso Geométrico", description: "Design moderno feito de plástico reciclado fundido", price: 120.00, image: "💎", category: "Vasos", artisan: "Vidro Arte" }
  ];

  const collectionPoints = [
    { id: 1, name: "EcoPonto Centro", address: "Rua das Flores, 123, São Paulo", distance: "1.2km", lat: -23.5505, lng: -46.6333, hours: "Seg-Sex: 8h-18h" },
    { id: 2, name: "Mercado Verde", address: "Av. Principal, 456, São Paulo", distance: "2.5km", lat: -23.5605, lng: -46.6433, hours: "Seg-Sáb: 7h-20h" },
    { id: 3, name: "Parque Ecológico", address: "Praça da Natureza, s/n, São Paulo", distance: "3.8km", lat: -23.5705, lng: -46.6533, hours: "Todos os dias: 6h-22h" },
  ];

  const [trees, setTrees] = useState([
    { id: 1, name: "Carvalho Jovem", stage: 2, level: 3, health: 85, icon: "🌳", xp: 120, maxXp: 200, waterCount: 5 },
    { id: 2, name: "Cerejeira em Flor", stage: 3, level: 5, health: 100, icon: "🌸", xp: 180, maxXp: 200, waterCount: 8 },
    { id: 3, name: "Pinheiro Mágico", stage: 1, level: 1, health: 60, icon: "🎄", xp: 45, maxXp: 100, waterCount: 2 },
  ]);

  // Parse markdown bold (**text**) to React elements
  const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // AI Chat function
  const sendAssistantMessage = async () => {
    if (!assistantMessage.trim() || isAiLoading) return;
    
    const userMsg = { role: "user", content: assistantMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setAssistantMessage("");
    setIsAiLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-assistant", {
        body: { messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.content })) }
      });

      if (error) {
        throw new Error(error.message);
      }

      const assistantResponse = { role: "assistant", content: data.message || "Desculpe, não consegui processar sua pergunta." };
      setChatMessages(prev => [...prev, assistantResponse]);
    } catch (error) {
      console.error("AI error:", error);
      toast({ title: "Erro", description: "Não foi possível conectar ao assistente. Tente novamente.", variant: "destructive" });
      setChatMessages(prev => [...prev, { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente em alguns instantes. 🙏" }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const completeMission = (missionId: number) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
      setUserXP(prev => prev + mission.xpReward);
      setUserPoints(prev => prev + mission.pointsReward);
      toast({ title: "🎉 Missão Completa!", description: `Você ganhou ${mission.xpReward} XP e ${mission.pointsReward} pontos!` });
    }
  };

  const validateDeliveryCode = () => {
    if (!deliveryCode.trim()) {
      toast({ title: "Código vazio", description: "Por favor, insira o código recebido no ponto de coleta.", variant: "destructive" });
      return;
    }

    setIsValidatingCode(true);
    setTimeout(() => {
      setIsValidatingCode(false);
      if (deliveryCode.toUpperCase().startsWith("ECO")) {
        const pointsEarned = Math.floor(Math.random() * 100) + 50;
        const xpEarned = Math.floor(Math.random() * 50) + 25;
        setUserPoints(prev => prev + pointsEarned);
        setUserXP(prev => prev + xpEarned);
        setDeliveryCode("");
        toast({ title: "🎉 Entrega Registrada!", description: `Você ganhou ${pointsEarned} pontos e ${xpEarned} XP!` });
      } else {
        toast({ title: "Código inválido", description: "Verifique o código e tente novamente.", variant: "destructive" });
      }
    }, 1500);
  };

  const openMapModal = (point: typeof collectionPoints[0]) => {
    setSelectedPoint(point);
    setMapModalOpen(true);
  };

  const openPurchaseModal = (product: typeof realProducts[0]) => {
    setSelectedProduct(product);
    setPurchaseModalOpen(true);
  };

  const handlePurchase = () => {
    if (!purchaseData.name || !purchaseData.email || !purchaseData.address || !purchaseData.phone) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    toast({ title: "✅ Pedido Realizado!", description: `Seu pedido de ${selectedProduct?.name} foi confirmado!` });
    setPurchaseModalOpen(false);
    setPurchaseData({ name: "", email: "", address: "", phone: "" });
  };

  const waterTree = (treeId: number) => {
    setTrees(prev => prev.map(tree => {
      if (tree.id === treeId) {
        const newXp = Math.min(tree.xp + 20, tree.maxXp);
        const levelUp = newXp >= tree.maxXp;
        toast({ title: "💧 Árvore Regada!", description: levelUp ? "Sua árvore subiu de nível!" : `+20 XP para ${tree.name}` });
        return { ...tree, xp: levelUp ? 0 : newXp, level: levelUp ? tree.level + 1 : tree.level, health: Math.min(tree.health + 10, 100), waterCount: tree.waterCount + 1 };
      }
      return tree;
    }));
    setUserPoints(prev => prev - 10);
  };

  const evolveTree = (treeId: number) => {
    setTrees(prev => prev.map(tree => {
      if (tree.id === treeId && tree.stage < 4) {
        const icons = ["🌱", "🌿", "🌳", "🌲"];
        toast({ title: "✨ Árvore Evoluiu!", description: `${tree.name} alcançou o estágio ${tree.stage + 1}!` });
        return { ...tree, stage: tree.stage + 1, icon: icons[tree.stage] };
      }
      return tree;
    }));
    setUserPoints(prev => prev - 50);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with User Stats */}
      <div className="border-b bg-gradient-to-r from-primary/10 via-success/10 to-primary/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                Olá, Reciclador! 
                <span className="text-4xl animate-glow inline-block">🌿</span>
              </h1>
              <p className="text-muted-foreground mt-1">Continue fazendo a diferença reciclando plásticos!</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Card className="flex-1 lg:w-64">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">Nível {userLevel}</span>
                    </div>
                    <Badge variant="secondary">{userXP} XP</Badge>
                  </div>
                  <Progress value={xpProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{xpToNextLevel - (userXP % xpToNextLevel)} XP para o próximo nível</p>
                </CardContent>
              </Card>
              
              <Card className="flex-1 lg:w-48">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{userPoints}</div>
                      <div className="text-xs text-muted-foreground">Pontos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Quick Stats with Animation */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Plásticos</p>
                  <p className="text-3xl font-bold">{userStats.recyclablesRegistered}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Kg Reciclados</p>
                  <p className="text-3xl font-bold text-success transition-all">
                    {animatedStats.kgRecycled.toFixed(1)}
                    <span className="text-xs ml-1 text-success/70 animate-pulse">▲</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Evitado</p>
                  <p className="text-3xl font-bold text-accent transition-all">
                    {animatedStats.co2Saved.toFixed(1)}kg
                    <span className="text-xs ml-1 text-accent/70 animate-pulse">▲</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ranking</p>
                  <p className="text-3xl font-bold">#{userStats.rankPosition}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs - Simplified */}
        <Tabs defaultValue="delivery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="delivery" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Entrega</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
            <TabsTrigger value="store" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Loja</span>
            </TabsTrigger>
            <TabsTrigger value="garden" className="gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Jardim</span>
            </TabsTrigger>
          </TabsList>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    Registrar Entrega de Plásticos
                  </CardTitle>
                  <CardDescription>Insira o código recebido no ponto de coleta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6 text-center">
                    <div className="text-6xl mb-4 animate-glow inline-block">♻️</div>
                    <p className="text-sm text-muted-foreground">Entregue seus plásticos e receba um código único</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Código de Entrega</label>
                      <Input placeholder="Ex: ECO-ABC123" value={deliveryCode} onChange={(e) => setDeliveryCode(e.target.value.toUpperCase())} className="text-center text-lg font-mono tracking-wider" maxLength={12} />
                    </div>
                    
                    <Button className="w-full" size="lg" onClick={validateDeliveryCode} disabled={isValidatingCode}>
                      {isValidatingCode ? (<><div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />Validando...</>) : (<><CheckCircle2 className="h-5 w-5 mr-2" />Validar Código</>)}
                    </Button>
                  </div>
                  
                  <div className="bg-success/10 rounded-lg p-4">
                    <p className="text-sm text-success font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Dica: Códigos válidos começam com "ECO"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-success" />
                    Pontos de Coleta de Plásticos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {collectionPoints.map((point) => (
                    <Card key={point.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-6 w-6 text-success" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{point.name}</h4>
                            <p className="text-sm text-muted-foreground">{point.address}</p>
                            <p className="text-xs text-muted-foreground">{point.hours}</p>
                            <Badge variant="secondary" className="mt-2">{point.distance}</Badge>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => openMapModal(point)}>Ver no Mapa</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab - Missions, Badges, Ranking */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Missões
                </CardTitle>
                <CardDescription>Complete missões para ganhar XP e pontos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {missions.map((mission) => {
                  const Icon = mission.icon;
                  const progress = (mission.progress / mission.total) * 100;
                  const isNumeric = typeof mission.progress === "number" && mission.progress % 1 !== 0;
                  
                  return (
                    <Card key={mission.id} className={cn("border-2 transition-all hover:shadow-md", mission.completed && "border-success bg-success/5")}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0", mission.completed ? "bg-success/20" : "bg-primary/10")}>
                            <Icon className={cn("h-6 w-6", mission.completed ? "text-success" : "text-primary")} />
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{mission.title}</h3>
                                <p className="text-sm text-muted-foreground">{mission.description}</p>
                              </div>
                              <Badge variant={mission.difficulty === "Fácil" ? "secondary" : mission.difficulty === "Médio" ? "outline" : "default"}>{mission.difficulty}</Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{isNumeric ? mission.progress.toFixed(1) : mission.progress}/{mission.total}</span>
                                <div className="flex gap-2">
                                  <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3" />+{mission.xpReward} XP</Badge>
                                  <Badge variant="outline" className="gap-1"><Gift className="h-3 w-3" />+{mission.pointsReward} pts</Badge>
                                </div>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                            
                            {!mission.completed && progress >= 100 && (
                              <Button size="sm" className="w-full sm:w-auto" onClick={() => completeMission(mission.id)}>
                                <CheckCircle2 className="h-4 w-4 mr-2" />Completar Missão
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Suas Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {badges.map((badge) => (
                    <div key={badge.id} className={cn("flex items-start gap-4 p-4 rounded-lg transition-all", badge.unlocked ? "bg-success/5 border border-success/30" : "bg-muted/30 opacity-60")}>
                      <div className={cn("text-4xl", badge.unlocked && "animate-glow")}>{badge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{badge.name}</h4>
                          {badge.unlocked ? (<Badge className="bg-success text-success-foreground text-xs">✓</Badge>) : (<Lock className="h-4 w-4 text-muted-foreground" />)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Ranking
                  </CardTitle>
                  <CardDescription>{userStats.totalUsers.toLocaleString()} recicladores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {ranking.map((user) => (
                      <div key={user.position} className={cn("flex items-center gap-3 p-3 rounded-lg transition-all", user.isUser ? "bg-primary/10 border-2 border-primary" : "bg-muted/30 hover:bg-muted/50")}>
                        <div className={cn("text-xl font-bold w-10 text-center", user.position <= 3 && "text-accent")}>{user.medal || `#${user.position}`}</div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.points.toLocaleString()} pts</div>
                        </div>
                        {user.isUser && <Badge className="bg-primary text-primary-foreground text-xs">Você</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Store Tab */}
          <TabsContent value="store" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-success" />
                      Produtos Artesanais de Plástico Reciclado
                    </CardTitle>
                    <CardDescription>Vasos feitos por artesãos locais com plástico reciclado</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-success border-success">
                    <CreditCard className="h-4 w-4 mr-2" />Compra com R$
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {realProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-all border-2 hover:border-success">
                      <CardContent className="p-6">
                        <div className="text-5xl mb-4 text-center animate-glow inline-block w-full">{product.image}</div>
                        <Badge variant="secondary" className="mb-3 bg-success/10 text-success">{product.category}</Badge>
                        <h3 className="font-semibold mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">por {product.artisan}</p>
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-success">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                          <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => openPurchaseModal(product)}>
                            <CreditCard className="h-4 w-4 mr-2" />Comprar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      Itens Virtuais
                    </CardTitle>
                    <CardDescription>Use seus pontos para itens exclusivos</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    <Gift className="h-4 w-4 mr-2" />{userPoints} pontos
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {storeItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="text-5xl mb-4 text-center animate-glow-accent inline-block w-full">{item.icon}</div>
                        <Badge variant="secondary" className="mb-3">{item.category}</Badge>
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <Button className="w-full" disabled={userPoints < item.price} variant={userPoints >= item.price ? "default" : "secondary"}>
                          {userPoints >= item.price ? (<><Gift className="h-4 w-4 mr-2" />Comprar - {item.price} pts</>) : (<><Lock className="h-4 w-4 mr-2" />{item.price} pontos</>)}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Garden Tab */}
          <TabsContent value="garden">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-success" />
                  Seu Jardim Virtual
                </CardTitle>
                <CardDescription>Cuide das suas árvores - elas crescem conforme você recicla plásticos!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {trees.map((tree) => (
                    <Card key={tree.id} className="overflow-hidden hover:shadow-xl transition-all group">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-br from-success/20 to-primary/10 p-8 text-center relative">
                          <div className="text-7xl mb-4 animate-glow inline-block group-hover:scale-110 transition-transform">{tree.icon}</div>
                          <div className="absolute top-2 right-2 flex flex-col gap-1">
                            <Badge variant="secondary">Nível {tree.level}</Badge>
                            <Badge variant="outline">Estágio {tree.stage}/4</Badge>
                          </div>
                          <div className="absolute top-2 left-2 flex items-center gap-1 text-sm">
                            <Droplets className="h-4 w-4 text-blue-400" />
                            <span>{tree.waterCount}</span>
                          </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg">{tree.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              {[...Array(5)].map((_, i) => (<Star key={i} className={cn("h-4 w-4", i < tree.level ? "text-accent fill-accent" : "text-muted")} />))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Saúde</span>
                              <span className={cn("font-medium", tree.health >= 80 ? "text-success" : tree.health >= 50 ? "text-accent" : "text-destructive")}>{tree.health}%</span>
                            </div>
                            <Progress value={tree.health} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>XP</span>
                              <span className="font-medium">{tree.xp}/{tree.maxXp}</span>
                            </div>
                            <Progress value={(tree.xp / tree.maxXp) * 100} className="h-2" />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={() => waterTree(tree.id)} disabled={userPoints < 10}>
                              <Droplets className="h-4 w-4 mr-2" />Regar (10 pts)
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => evolveTree(tree.id)} disabled={userPoints < 50 || tree.stage >= 4}>
                              <ArrowUp className="h-4 w-4 mr-2" />Evoluir (50 pts)
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="border-dashed border-2 hover:border-primary transition-all cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Plantar Nova Árvore</h3>
                      <p className="text-sm text-muted-foreground mb-4">Recicle mais 10kg de plástico para desbloquear</p>
                      <Progress value={75} className="w-full h-2 mb-2" />
                      <Badge variant="secondary">37.8kg / 50kg</Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🌱</span>
              <div>
                <h3 className="text-xl font-bold text-primary">RePlant</h3>
                <p className="text-sm text-muted-foreground">Transformando plástico em um futuro verde</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <a href="mailto:replant.oficial@gmail.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                replant.oficial@gmail.com
              </a>
              <p className="text-xs text-muted-foreground mt-2">© 2024 RePlant. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Virtual Assistant Button */}
      <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50" onClick={() => setAssistantOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Assistant Dialog */}
      <Dialog open={assistantOpen} onOpenChange={setAssistantOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span> Assistente RePlant
            </DialogTitle>
            <DialogDescription>Tire suas dúvidas sobre reciclagem de plásticos</DialogDescription>
          </DialogHeader>
          
          <div className="h-[300px] overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[80%] rounded-lg p-3 text-sm whitespace-pre-line", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-background border")}>
                  {parseMarkdown(msg.content)}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="flex justify-start">
                <div className="bg-background border rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Digitando...</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input placeholder="Pergunte sobre plásticos recicláveis..." value={assistantMessage} onChange={(e) => setAssistantMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendAssistantMessage()} disabled={isAiLoading} />
            <Button onClick={sendAssistantMessage} disabled={isAiLoading}>
              {isAiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Map Modal */}
      <Dialog open={mapModalOpen} onOpenChange={setMapModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-success" />
              {selectedPoint?.name}
            </DialogTitle>
            <DialogDescription>{selectedPoint?.address}</DialogDescription>
          </DialogHeader>
          
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {selectedPoint && (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(selectedPoint.name + ", " + selectedPoint.address)}&zoom=15`}
              />
            )}
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm"><strong>Horário:</strong> {selectedPoint?.hours}</p>
            <p className="text-sm"><strong>Distância:</strong> {selectedPoint?.distance}</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMapModalOpen(false)}>Fechar</Button>
            <Button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedPoint?.name + ", " + selectedPoint?.address || "")}`, "_blank")}>
              <MapPin className="h-4 w-4 mr-2" />Abrir no Google Maps
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Modal */}
      <Dialog open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-success" />
              Finalizar Compra
            </DialogTitle>
            <DialogDescription>
              {selectedProduct?.name} - R$ {selectedProduct?.price.toFixed(2).replace(".", ",")}
            </DialogDescription>
          </DialogHeader>

          <div className="text-center py-4">
            <div className="text-6xl animate-glow inline-block">{selectedProduct?.image}</div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome Completo</label>
              <Input placeholder="Seu nome" value={purchaseData.name} onChange={(e) => setPurchaseData(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">E-mail</label>
              <Input type="email" placeholder="seu@email.com" value={purchaseData.email} onChange={(e) => setPurchaseData(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Endereço de Entrega</label>
              <Input placeholder="Rua, número, bairro, cidade" value={purchaseData.address} onChange={(e) => setPurchaseData(p => ({ ...p, address: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Telefone</label>
              <Input placeholder="(00) 00000-0000" value={purchaseData.phone} onChange={(e) => setPurchaseData(p => ({ ...p, phone: e.target.value }))} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPurchaseModalOpen(false)}>Cancelar</Button>
            <Button className="bg-success hover:bg-success/90" onClick={handlePurchase}>
              <CreditCard className="h-4 w-4 mr-2" />Confirmar Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
