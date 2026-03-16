import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Recycle, 
  Trophy, 
  Leaf, 
  QrCode, 
  ShoppingBag, 
  MapPin, 
  User, 
  Handshake,
  Sparkles,
  Target,
  Gift,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const features = [
    {
      icon: Recycle,
      title: "Registro de Recicláveis",
      description: "Escaneie QR codes e registre seus materiais recicláveis com facilidade"
    },
    {
      icon: Trophy,
      title: "Pontos & Recompensas",
      description: "Ganhe pontos a cada reciclagem e troque por benefícios reais"
    },
    {
      icon: Sparkles,
      title: "Gamificação",
      description: "Missões diárias, badges e ranking para tornar a reciclagem divertida"
    },
    {
      icon: QrCode,
      title: "Rastreabilidade",
      description: "Acompanhe o destino dos seus recicláveis em tempo real"
    },
    {
      icon: ShoppingBag,
      title: "Catálogo Local",
      description: "Produtos reciclados feitos por artesãos da sua região"
    },
    {
      icon: MapPin,
      title: "Pontos de Entrega",
      description: "Encontre facilmente locais para entregar seus recicláveis"
    },
    {
      icon: User,
      title: "Perfil Sustentável",
      description: "Veja seu impacto ambiental e conquistas acumuladas"
    },
    {
      icon: Handshake,
      title: "Parcerias Locais",
      description: "Descontos em comércios parceiros por sua contribuição"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Registre",
      description: "Escaneie o QR code dos seus recicláveis",
      icon: QrCode
    },
    {
      number: "02",
      title: "Ganhe Pontos",
      description: "Acumule pontos e suba no ranking",
      icon: Trophy
    },
    {
      number: "03",
      title: "Veja o Impacto",
      description: "Acompanhe sua árvore crescer e o impacto real",
      icon: Leaf
    }
  ];

  const comparisons = [
    {
      aspect: "Rastreabilidade",
      replanta: true,
      coleta: false,
      artesaos: false,
      apps: true
    },
    {
      aspect: "Recompensas",
      replanta: true,
      coleta: false,
      artesaos: false,
      apps: true
    },
    {
      aspect: "Gamificação",
      replanta: true,
      coleta: false,
      artesaos: false,
      apps: false
    },
    {
      aspect: "Impacto Visível",
      replanta: true,
      coleta: false,
      artesaos: true,
      apps: false
    },
    {
      aspect: "Produtos Locais",
      replanta: true,
      coleta: false,
      artesaos: true,
      apps: false
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Usuária RePlanta",
      content: "Em 3 meses reciclei mais de 50kg de plástico e ainda ganhei descontos em lojas locais!",
      impact: "50kg reciclados"
    },
    {
      name: "João Santos",
      role: "Comerciante Parceiro",
      content: "Aumentamos o engajamento da comunidade e nossos clientes adoram as recompensas.",
      impact: "200+ clientes"
    },
    {
      name: "Ana Costa",
      role: "Artesã Local",
      content: "Agora tenho acesso constante a materiais e uma vitrine para minhas criações.",
      impact: "150+ produtos vendidos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-95" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="animate-fade-in space-y-8">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                🌱 Transforme reciclagem em impacto
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
                Transforme reciclagem em jogo, recompensa e impacto real
              </h1>
              
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                A plataforma que gamifica a reciclagem, conecta você a artesãos locais 
                e mostra o impacto ambiental de cada ação.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all">
                    Comece Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Ver Como Funciona
                </Button>
              </div>
              
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-accent">10k+</div>
                  <div className="text-sm text-primary-foreground/80">Usuários Ativos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <div className="text-sm text-primary-foreground/80">Toneladas Recicladas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">200+</div>
                  <div className="text-sm text-primary-foreground/80">Artesãos Parceiros</div>
                </div>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <img 
                src={heroImage} 
                alt="RePlanta App Interface" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Como Funciona</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Simples em 3 Passos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece a fazer diferença hoje mesmo
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card 
                  key={index}
                  className="relative overflow-hidden border-2 hover:border-primary transition-all hover:shadow-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5">
                      {step.number}
                    </div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Funcionalidades</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa para revolucionar a reciclagem na sua cidade
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-lg transition-all hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Diferenciais</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Por que escolher o RePlant?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare e veja porque somos a melhor solução
            </p>
          </div>
          
          <Card className="overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-semibold">Funcionalidade</th>
                    <th className="p-4 text-center font-semibold text-primary">RePlant</th>
                    <th className="p-4 text-center font-semibold">Coleta Pública</th>
                    <th className="p-4 text-center font-semibold">Artesãos</th>
                    <th className="p-4 text-center font-semibold">Apps Genéricos</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{row.aspect}</td>
                      <td className="p-4 text-center">
                        {row.replanta ? (
                          <CheckCircle2 className="h-6 w-6 text-success mx-auto" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-muted mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.coleta ? (
                          <CheckCircle2 className="h-6 w-6 text-success mx-auto" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-muted mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.artesaos ? (
                          <CheckCircle2 className="h-6 w-6 text-success mx-auto" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-muted mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.apps ? (
                          <CheckCircle2 className="h-6 w-6 text-success mx-auto" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-muted mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Depoimentos</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              O que dizem nossos usuários
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de impacto positivo
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                    {testimonial.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              Pronto para fazer a diferença?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Junte-se a milhares de pessoas que já estão transformando reciclagem em impacto real
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl hover:shadow-2xl transition-all">
                Começar Agora Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              Sem cartão de crédito • Configure em 2 minutos • Impacto imediato
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">RePlant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RePlant. Transformando reciclagem em impacto real.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;