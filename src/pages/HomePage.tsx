import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const advantages = [
    {
      icon: Shield,
      title: t('home.advantages.authenticity.title'),
      description: t('home.advantages.authenticity.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: DollarSign,
      title: t('home.advantages.investment.title'),
      description: t('home.advantages.investment.description'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: t('home.advantages.liquidity.title'),
      description: t('home.advantages.liquidity.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lock,
      title: t('home.advantages.security.title'),
      description: t('home.advantages.security.description'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Globe,
      title: t('home.advantages.global.title'),
      description: t('home.advantages.global.description'),
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Sparkles,
      title: t('home.advantages.innovation.title'),
      description: t('home.advantages.innovation.description'),
      color: 'from-yellow-400 to-pink-400',
    },
  ];

  const steps = [
    {
      number: '01',
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description'),
    },
    {
      number: '02',
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description'),
    },
    {
      number: '03',
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-purple-900 via-blue-900 to-purple-800 dark:from-purple-950 dark:via-blue-950 dark:to-purple-900 text-white min-h-screen flex items-center justify-center">
        {/* Imagem de fundo artística */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={arteBg}
            alt="Arte NFT Background"
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/75 via-blue-900/75 to-purple-800/75 dark:from-purple-950/85 dark:via-blue-950/85 dark:to-purple-900/85"></div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAxMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge removido conforme solicitação */}

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t('home.title')}
                <span className="block bg-linear-to-r from-yellow-400 via-pink-400 to-pink-500 dark:from-yellow-300 dark:via-pink-300 dark:to-pink-400 bg-clip-text text-transparent">
                  {t('home.titleGradient')}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-4 text-purple-100 dark:text-purple-200 font-semibold"
              >
                {t('home.subtitle')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg mb-12 text-purple-200 dark:text-purple-300 max-w-2xl mx-auto leading-relaxed"
              >
                {t('home.description')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/upload">
                  <Button variant="secondary" size="lg" className="group">
                    {t('home.createNFT')}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </Button>
                </Link>
                <Link to="/galeria">
                  <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 dark:hover:text-purple-950 transition-all duration-300">
                    {t('home.exploreGallery')}
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
                { label: t('home.stats.artists'), value: '500+', icon: Globe },
                { label: t('home.stats.nfts'), value: '2.5K+', icon: Sparkles },
                { label: t('home.stats.value'), value: '10M+', icon: TrendingUp },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400 dark:text-yellow-300" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-purple-200 dark:text-purple-300">{stat.label}</div>
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
              className="fill-gray-50 dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-linear-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t('home.advantages.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.advantages.subtitle')}
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
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-shadow border border-transparent dark:border-gray-700 flex flex-col items-center text-center"
              >
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-linear-to-br ${advantage.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <advantage.icon size={32} className="text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {advantage.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-24 bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
        {/* Efeito de brilho de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>

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
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 dark:bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-400/30 dark:border-purple-400/20 mb-6"
            >
              <Sparkles size={20} className="text-yellow-400 dark:text-yellow-300" />
              <span className="text-sm font-semibold text-purple-200 dark:text-purple-300">{t('home.featured.badge')}</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('home.featured.title')}
            </h2>
            <p className="text-xl text-purple-200 dark:text-purple-300 max-w-2xl mx-auto">
              {t('home.featured.subtitle')}
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
                <div className="bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 dark:border-purple-500/10 hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-400 dark:text-yellow-300" />
                            <span className="text-sm font-semibold">{t('home.featured.available')}</span>
                          </div>
                          <span className="text-lg font-bold text-purple-400 dark:text-purple-300">{artwork.price}</span>
                        </div>
                        <Link to="/galeria">
                          <button className="w-full mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 rounded-lg font-semibold transition-colors">
                            {t('home.featured.viewDetails')}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-purple-500/20 dark:bg-purple-500/10 text-purple-300 dark:text-purple-200 rounded-full text-xs font-semibold border border-purple-500/30 dark:border-purple-500/20">
                        {artwork.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400 dark:text-yellow-300">
                        <Sparkles size={14} />
                        <span className="text-xs font-semibold">NFT</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-purple-300 dark:text-purple-200 text-sm">
                      Por {artwork.artist}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full flex justify-center mt-12">
            <Link to="/galeria" className="inline-block">
              <Button variant="primary" size="lg">
                {t('home.featured.viewAll')}
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-linear-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.howItWorks.subtitle')}
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
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl dark:shadow-purple-500/20">
                    {step.number}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <CheckCircle className="text-green-500 dark:text-green-400" size={24} />
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-purple-600 via-purple-700 to-blue-600 dark:from-purple-800 dark:via-purple-900 dark:to-blue-800 text-white relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-linear-to-br from-yellow-400/20 via-pink-500/20 to-purple-600/20 dark:from-yellow-400/10 dark:via-pink-500/10 dark:to-purple-600/10 animate-pulse"></div>
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
              {t('home.cta.title')}
            </h2>

            <p className="text-xl mb-12 max-w-2xl mx-auto text-purple-100 dark:text-purple-200">
              {t('home.cta.subtitle')}
            </p>

            <div className="w-full flex justify-center">
              <Link to="/upload" className="inline-block">
                <Button variant="secondary" size="lg">
                  {t('home.cta.button')}
                  <Sparkles size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
