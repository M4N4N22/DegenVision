"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation"

const Hero = () => {
    const router = useRouter()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/4 top-1/4 size-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 size-96 rounded-full bg-purple-500/10 blur-3xl" style={{animationDelay: '2s'}}></div>
        <div className="animate-pulse-slow absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="glass-card animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Zap className="size-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Real-time Blockchain Analytics</span>
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-in mb-6 text-6xl font-bold md:text-8xl" style={{animationDelay: '0.2s'}}>
            <span className="gradient-text">Predict the Chain.</span>
            <br />
            <span className="text-white">Prove Your Strategy.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl" style={{animationDelay: '0.4s'}}>
            Harness real-time on-chain wallet activity to make strategic predictions. 
            Test your alpha against the market and climb the leaderboard.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in mb-16 flex flex-col justify-center gap-4 sm:flex-row" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              className="neon-glow bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-purple-500"
              onClick={() => router.push('/game')}
            >
              Join Game
              <ArrowRight className="ml-2 size-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
              onClick={() => router.push('/leaderboard')}
            >
              View Leaderboard
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="animate-fade-in mx-auto grid max-w-4xl gap-8 md:grid-cols-3" style={{animationDelay: '0.8s'}}>
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-105">
              <TrendingUp className="mx-auto mb-4 size-8 text-green-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">Live Market Data</h3>
              <p className="text-sm text-gray-400">Real-time blockchain analytics and wallet movements</p>
            </div>
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-105">
              <Zap className="mx-auto mb-4 size-8 text-yellow-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">Strategic Predictions</h3>
              <p className="text-sm text-gray-400">Test your market intuition with timed challenges</p>
            </div>
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-105">
              <Shield className="mx-auto mb-4 size-8 text-blue-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">Secure & Fair</h3>
              <p className="text-sm text-gray-400">Transparent, blockchain-verified results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default Hero;
