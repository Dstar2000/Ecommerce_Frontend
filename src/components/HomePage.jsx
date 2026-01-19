"use client";
import {
  ArrowRight,
  ShoppingBag,
  User,
  Store,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-black rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">COMMERCE</span>
            </div>

            <Link href="/auth/login">
              <button className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-black transition-colors">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10"></div>

        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full mb-8">
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider">
                Modern Ecommerce
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Built for the
              <span className="block text-black">digital marketplace</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A complete ecommerce platform with modern architecture, secure
              authentication, and enterprise-ready features.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/auth/register/customer">
                <button className="group px-7 py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                  <span>Start shopping</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/auth/register/shop">
                <button className="px-7 py-3.5 border border-gray-300 text-gray-900 font-medium rounded-lg hover:border-black hover:bg-gray-50 transition-colors">
                  Open store
                </button>
              </Link>
            </div>

            {/* Grid Pattern */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <Shield className="h-5 w-5 text-gray-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enterprise-grade security with advanced authentication and
                  data protection protocols.
                </p>
              </div>

              <div className="group">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <Zap className="h-5 w-5 text-gray-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Performant
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Optimized for speed with modern architecture and efficient
                  data management.
                </p>
              </div>

              <div className="group">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <ShoppingBag className="h-5 w-5 text-gray-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Complete
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Full-featured commerce solution with all essential tools for
                  modern retail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get started
              </h2>
              <p className="text-gray-600">
                Choose your account type and begin your journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Customer
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Shop from curated collections with secure checkout
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    "Access to all products",
                    "Secure payment processing",
                    "Fast delivery options",
                    "Customer support",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 bg-black rounded-full"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/auth/register/customer">
                  <button className="w-full py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors">
                    Register as customer
                  </button>
                </Link>
              </div>

              {/* Shop Owner Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Store className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Shop owner
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Create and manage your online store with powerful tools
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    "Product management",
                    "Order processing",
                    "Analytics dashboard",
                    "Inventory control",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 bg-black rounded-full"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/auth/register/shop">
                  <button className="w-full py-3.5 border border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Register as shop owner
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Already have an account?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sign in to access your dashboard and continue your journey
          </p>
          <Link href="/auth/login">
            <button className="px-8 py-3.5 border-2 border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Sign in to your account
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="h-6 w-6 bg-black rounded flex items-center justify-center">
                <ShoppingBag className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                COMMERCE
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} Commerce Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
