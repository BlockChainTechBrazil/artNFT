import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  TrendingUp,
  DollarSign,
  Lock,
  Globe,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/Button';

// Importar imagens locais
import arte1 from '../assets/artes/arte1.jpeg';
import arte2 from '../assets/artes/arte2.jpeg';
import arte3 from '../assets/artes/arte3.jpeg';
import arteBg from '../assets/artes/arte.png';

export const HomePage = () => {
  const advantages = [
    {
      icon: Shield,
      title: 'Autenticidade Garantida',
      description: 'A tecnologia blockchain assegura a originalidade e propriedade da obra.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: DollarSign,
      title: 'Acesso a Investimentos',
      description: 'Permite que investidores adquiram frações de obras de arte, democratizando o acesso ao mercado.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Liquidez',
      description: 'Facilita a compra e venda de obras de arte, aumentando a liquidez do mercado.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lock,
      title: 'Transparência',
      description: 'Todas as transações são registradas em um livro-razão público, garantindo transparência e segurança.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Globe,
      title: 'Novos Mercados',
      description: 'Abre oportunidades para artistas emergentes e colecionadores globais.',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Crie um Token Único',
      description: 'Transforme sua obra de arte em um NFT exclusivo e valioso.',
    },
    {
      number: '02',
      title: 'Venda ou Licencie',
      description: 'Aproveite as oportunidades de venda e licenciamento para monetizar sua criatividade.',
    },
    {
      number: '03',
      title: 'Conecte-se com o Mundo',
      description: 'Alcance um público global e apaixonado por arte e tecnologia.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-purple-900 via-blue-900 to-purple-800 text-white">
        {/* Imagem de fundo artística */}
        <div className="absolute inset-0">
          <img
            src={arteBg}
            alt="Arte NFT Background"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/75 via-blue-900/75 to-purple-800/75"></div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAxMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge de destaque */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
              >
                <Sparkles size={20} className="text-yellow-400" />
                <span className="text-sm font-semibold">Plataforma NFT de Arte Digital</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                A Revolução da
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-pink-500 bg-clip-text text-transparent">
                  Arte Digital
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-4 text-purple-100 font-semibold"
              >
                Tokenização e NFTs
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg mb-12 text-purple-200 max-w-2xl mx-auto leading-relaxed"
              >
                Descubra como a tokenização de obras de arte e a conversão em NFTs
                estão transformando o mercado artístico global!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/upload">
                  <Button variant="secondary" size="lg" className="group">
                    Criar Seu NFT
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </Button>
                </Link>
                <Link to="/galeria">
                  <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 transition-all duration-300">
                    Explorar Galeria
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
            >
              {[
                { label: 'Artistas Ativos', value: '500+', icon: Globe },
                { label: 'NFTs Criados', value: '2.5K+', icon: Sparkles },
                { label: 'Valor Negociado', value: '10M+', icon: TrendingUp },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-purple-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Vantagens da Tokenização
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforme sua arte em ativos digitais com benefícios únicos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <advantage.icon size={32} className="text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {advantage.title}
                </h3>

                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        {/* Efeito de brilho de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30 mb-6"
            >
              <Sparkles size={20} className="text-yellow-400" />
              <span className="text-sm font-semibold text-purple-200">Galeria em Destaque</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Obras em Destaque
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Conheça algumas das obras tokenizadas em nossa plataforma
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Arte Digital Moderna',
                image: arte1,
                artist: 'Artista Premium',
                category: 'Arte Digital',
                price: '2.5 ETH'
              },
              {
                title: 'Criação Exclusiva',
                image: arte2,
                artist: 'Criador NFT',
                category: 'Arte Digital',
                price: '1.8 ETH'
              },
              {
                title: 'Obra Tokenizada',
                image: arte3,
                artist: 'Designer Blockchain',
                category: 'Arte Abstrata',
                price: '3.2 ETH'
              },
            ].map((artwork, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-semibold">NFT Disponível</span>
                          </div>
                          <span className="text-lg font-bold text-purple-400">{artwork.price}</span>
                        </div>
                        <Link to="/galeria">
                          <button className="w-full mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                            Ver Detalhes
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30">
                        {artwork.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Sparkles size={14} />
                        <span className="text-xs font-semibold">NFT</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      Por {artwork.artist}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/galeria">
              <Button variant="primary" size="lg">
                Ver Galeria Completa
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Converta sua Obra de Arte em NFT
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Um processo simples e seguro para transformar sua criatividade em valor
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    {step.number}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <CheckCircle className="text-green-500" size={24} />
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-600/20 animate-pulse"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Junte-se à Revolução da Arte Digital!
            </h2>

            <p className="text-xl mb-12 max-w-2xl mx-auto text-purple-100">
              Saiba mais sobre como a tokenização e os NFTs podem transformar
              sua experiência com a arte.
            </p>

            <Link to="/upload">
              <Button variant="secondary" size="lg">
                Começar Agora
                <Sparkles size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
