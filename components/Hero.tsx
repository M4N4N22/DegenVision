"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

const Hero = () => {
  const router = useRouter()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background bg-grid-squares">
      <SiteHeader/>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/4 top-1/4 size-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div
          className="animate-pulse-slow absolute bottom-1/4 right-1/4 size-96 rounded-full bg-sky-500/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="animate-pulse-slow absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-2">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Zap className="size-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">
              Real-time Blockchain Analytics
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="in mb-6 text-6xl font-extrabold md:text-7xl tracking-tighter uppercase"
        
          >
            <span className="text-emerald-500">Predict the Chain.</span>
            <br />
            <span className="text-white">Prove Your Strategy.</span>
          </h1>

          {/* Subtitle */}
          <p
            className=" mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-white/50 md:text-2xl"
      
          >
            Harness real-time on-chain wallet activity to make strategic
            predictions. Test your vision against the market and climb the
            leaderboard.
          </p>

          {/* CTA Buttons */}
          <div
            className=" mb-16 flex flex-col justify-center gap-4 sm:flex-row"
          
          >
            <Button
              size="lg"
              className="neon-glow transition-all bg-gradient-to-r rounded-full px-2 from-emerald-600 via-emerald-600 to-cyan-600 text-lg font-semibold text-white  duration-300  hover:from-emerald-500 hover:to-cyan-500"
              onClick={() => router.push("/predict")}
            >
              <span className="pl-6 pr-2 tracking-wider">Predict Now</span>
              <div className="bg-white/15 rounded-full p-2 ml-2 shadow-lg">
                <ArrowRight className="size-5 " />
              </div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass border-2 border-white/20 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300  hover:bg-white/10"
              onClick={() => router.push("/leaderboard")}
            >
               <span className="tracking-wider">View Leaderboard</span>
            </Button>
          </div>

          {/* Feature highlights */}
          <div
            className=" mx-auto grid max-w-4xl gap-8 md:grid-cols-3"
       
          >
            <div className="glass-card rounded-3xl p-6 transition-all duration-300 hover:scale-105">
              <TrendingUp className="mx-auto mb-4 size-8 text-emerald-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">
                Live Market Data
              </h3>
              <p className="text-sm text-gray-400">
                Real-time blockchain analytics and wallet movements
              </p>
            </div>
            <div className="glass-card rounded-3xl p-6 transition-all duration-300 hover:scale-105">
              <Zap className="mx-auto mb-4 size-8 text-yellow-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">
                Strategic Predictions
              </h3>
              <p className="text-sm text-gray-400">
                Test your market intuition with timed challenges
              </p>
            </div>
            <div className="glass-card rounded-3xl p-6 transition-all duration-300 hover:scale-105">
              <Shield className="mx-auto mb-4 size-8 text-blue-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">
                Secure & Fair
              </h3>
              <p className="text-sm text-gray-400">
                Transparent, blockchain-verified results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
    </div>
  )
}

export default Hero
