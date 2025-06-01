"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation"

const Hero = () => {
    const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Real-time Blockchain Analytics</span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <span className="gradient-text">Predict the Chain.</span>
            <br />
            <span className="text-white">Prove Your Strategy.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
            Harness real-time on-chain wallet activity to make strategic predictions. 
            Test your alpha against the market and climb the leaderboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold neon-glow transition-all duration-300 hover:scale-105"
              onClick={() => router.push('/game')}
            >
              Join Game
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => router.push('/leaderboard')}
            >
              View Leaderboard
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '0.8s'}}>
            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Live Market Data</h3>
              <p className="text-gray-400 text-sm">Real-time blockchain analytics and wallet movements</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <Zap className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Strategic Predictions</h3>
              <p className="text-gray-400 text-sm">Test your market intuition with timed challenges</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <Shield className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Fair</h3>
              <p className="text-gray-400 text-sm">Transparent, blockchain-verified results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default Hero;
