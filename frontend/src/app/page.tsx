'use client'

import {
  ArrowRightIcon,
  BellRingingIcon,
  CheckCircleIcon,
  Clock,
  ClockIcon,
  GithubLogoIcon,
  LightningIcon,
  ListChecksIcon,
  ListDashesIcon,
  StackIcon,
  StarIcon,
  TagIcon,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { Checkbox } from '@/components/animate-ui/components/base/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'motion/react'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground antialiased">
      {/* Header / Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <span className="text-xl font-bold tracking-tight">Next Up</span>

          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost" className="text-sm font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="font-medium shadow-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 pb-16 text-center md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-4xl leading-[1.1] font-black tracking-tight sm:text-6xl lg:text-7xl"
          >
            Your ultimate engine for{' '}
            <span className="text-primary underline decoration-wavy decoration-1 underline-offset-8">
              micro-productivity
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed font-normal text-muted-foreground sm:text-xl"
          >
            Break down complex workflows into actionable tasks, organize using deep metadata layers, and stay updated
            with persistent background system reminders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex w-full items-center justify-center"
          >
            <Link
              href="https://github.com/xvea/Member-GPU"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="outline" className="w-full gap-2 text-base sm:w-auto">
                <GithubLogoIcon weight="bold" className="h-5 w-5" />
                View Repository
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Dashboard Preview Component Mockup */}
        <section id="preview" className="mx-auto max-w-6xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="group relative w-full overflow-hidden rounded-xl border bg-card p-4 shadow-2xl md:p-6"
          >
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2.5">
                {/* Menggunakan semantic colors untuk dot window */}
                <span className="block h-3 w-3 rounded-full bg-destructive/80" />
                <span className="block h-3 w-3 rounded-full bg-primary/40" />
                <span className="block h-3 w-3 rounded-full bg-secondary" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">tasks/all</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Mock Task Card 1 */}
              <Card className="flex flex-col shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="destructive" className="px-2 py-0.5 text-[10px]">
                      High Priority
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      List: Capstone
                    </Badge>
                  </div>
                  <CardTitle className="text-sm leading-tight font-semibold">
                    Refactor Express route validation pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-4 pt-0">
                  <CardDescription className="mb-3 line-clamp-2 text-xs">
                    Migrate incoming HTTP payload checks to robust Zod schemas across endpoints.
                  </CardDescription>
                  <div className="space-y-2 border-t pt-3">
                    <div className="flex items-start gap-2">
                      <Checkbox id="sub1" checked disabled className="mt-0.5" />
                      <label htmlFor="sub1" className="text-xs text-muted-foreground line-through opacity-70">
                        Setup drizzle-kit generate config
                      </label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="sub2" disabled className="mt-0.5" />
                      <label htmlFor="sub2" className="text-xs">
                        Write comprehensive unit test suite in Vitest
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mock Task Card 2 */}
              <Card className="flex flex-col shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="default" className="px-2 py-0.5 text-[10px]">
                      Medium Priority
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      List: Frontend
                    </Badge>
                  </div>
                  <CardTitle className="text-sm leading-tight font-semibold">
                    Integrate motion micro-interactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-4 pt-0">
                  <CardDescription className="line-clamp-2 text-xs">
                    Configure staggered layout entries and layout animations inside core view layouts.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4 pt-3">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Clock weight="bold" className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">09:00 AM</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    Tag: UI-UX
                  </Badge>
                </CardFooter>
              </Card>

              {/* Mock Task Card 3 */}
              <Card className="flex flex-col shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">
                      Low Priority
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      List: Devops
                    </Badge>
                  </div>
                  <CardTitle className="text-sm leading-tight font-semibold">
                    Setup Web Push subscription worker
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-4 pt-0">
                  <CardDescription className="line-clamp-2 text-xs">
                    Store background VAPID keys natively inside SQLite to coordinate edge triggers.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 border-t p-4 pt-3">
                  <Badge variant="secondary" className="text-[10px]">
                    Tag: Core-API
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    Tag: ServiceWorker
                  </Badge>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Bento Grid Features Section */}
        <section id="features" className="border-y border-border/40 bg-secondary/40 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">
                  Engineered for absolute structural clarity.
                </h2>
                <p className="text-base text-muted-foreground sm:text-lg">
                  No distractions. Next Up provides modular architectural blocks designed to track granular states
                  effortlessly.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                Data Model Blueprint: schema.ts ready
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {/* Feature 1: Subtasks (Large Box) */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card className="flex h-full flex-col justify-between overflow-hidden border-border/60 bg-card">
                  <CardHeader>
                    <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                      <ListChecksIcon weight="duotone" className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Hierarchical Subtasks Isolation</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between">
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Complex objectives fail when they aren't actionable. Break distinct tasks down into standalone
                      recursive sub-elements tracking boolean progress states without affecting the parent scope.
                    </p>
                    <div className="rounded-lg border border-border/40 bg-secondary/60 p-3 font-mono text-xs text-muted-foreground/80">
                      Relation mapping:{' '}
                      <span className="text-primary">tasks.id ───🕹️ cascade ───🧬 subtasks.taskId</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feature 2: Push Notifications */}
              <motion.div variants={itemVariants}>
                <Card className="flex h-full flex-col justify-between border-border/60 bg-card">
                  <CardHeader>
                    <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                      <BellRingingIcon weight="duotone" className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Persistent VAPID Reminders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Leverage service-worker backend pipelines executing cron checks to dispatch accurate web-push
                      subscriptions directly to your device.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feature 3: Project Lists & Tag Matrix */}
              <motion.div variants={itemVariants}>
                <Card className="flex h-full flex-col justify-between border-border/60 bg-card">
                  <CardHeader>
                    <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                      <ListDashesIcon weight="duotone" className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Dedicated Scopes & Lists</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Partition personal task sets from complex capstone structures cleanly using localized List IDs
                      matching relational user parameters.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feature 4: Tags */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card className="flex h-full flex-col justify-between overflow-hidden border-border/60 bg-card">
                  <CardHeader>
                    <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                      <TagIcon weight="duotone" className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Cross-Relational Tag Matrix</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between">
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Break free from strict folders. Map tasks to infinite categorizations using intermediate link
                      tables that bridge cross-cutting requirements together natively across both the database and
                      views.
                    </p>
                    <div className="rounded-lg border border-border/40 bg-secondary/60 p-3 font-mono text-xs text-muted-foreground/80">
                      Join mapping: <span className="text-primary">task_tags index (taskId, tagId)</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technical Architecture Section (Capstone Value-Add) */}
        <section id="architecture" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">Engineered Stack Infrastructure</h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              A breakdown of the low-overhead full-stack capabilities sustaining real-time processing under the hood.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-xl border border-border/60 bg-card/40 p-5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-primary uppercase">
                <LightningIcon weight="bold" className="h-4 w-4" /> Frontend
              </div>
              <h4 className="text-base font-bold">Next.js 16 (Turbopack)</h4>
              <p className="text-xs text-muted-foreground">
                Declarative layout routing paired with ultra-fast incremental compilation builds.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border/60 bg-card/40 p-5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-primary uppercase">
                <StackIcon weight="bold" className="h-4 w-4" /> Backend
              </div>
              <h4 className="text-base font-bold">Express 5 REST API</h4>
              <p className="text-xs text-muted-foreground">
                Modular route structures engineered to support high throughput data formatting.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border/60 bg-card/40 p-5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-primary uppercase">
                <CheckCircleIcon weight="bold" className="h-4 w-4" /> Database ORM
              </div>
              <h4 className="text-base font-bold">Drizzle ORM & LibSQL</h4>
              <p className="text-xs text-muted-foreground">
                Strict, fast, type-safe SQLite interaction with automated index generation mappings.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border/60 bg-card/40 p-5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-primary uppercase">
                <ClockIcon weight="bold" className="h-4 w-4" /> Auth Protocol
              </div>
              <h4 className="text-base font-bold">Better-Auth Sync</h4>
              <p className="text-xs text-muted-foreground">
                Secure multi-provider workflows supporting Google OAuth alongside token flows.
              </p>
            </div>
          </div>
        </section>

        {/* Minimal Bottom CTA */}
        <section className="bg-primary px-6 py-20 text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Streamline your production metrics.</h2>
            <p className="mx-auto max-w-xl text-base text-primary-foreground/80 sm:text-lg">
              Experience total state control without arbitrary microtransaction gates. Deployable, modular, and fast.
            </p>
            <div className="pt-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-6 text-base font-bold text-primary"
                >
                  Enter Next Up Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background px-6 py-10">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex font-bold text-primary">
            <span>Next Up</span>
          </div>

          <p className="order-3 font-mono text-xs text-muted-foreground sm:order-2 sm:text-sm">
            &copy; {new Date().getFullYear()} Next Up. Designed as an open-source Capstone System.
          </p>

          <div className="order-2 flex items-center gap-6 sm:order-3">
            <Link
              href="https://github.com/xvea/Member-GPU"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <GithubLogoIcon weight="bold" className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
