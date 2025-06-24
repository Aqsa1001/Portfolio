"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Wrench,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Award,
  Calendar,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Set client-side flag after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "skills", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDownloadCV = () => {
    try {
      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = "/Aqsa_Shafiq_CV.pdf"
      link.download = "Aqsa_Shafiq_Resume.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Optional: Show a success message (you can remove this if you don't want it)
      console.log("CV download initiated successfully!")
    } catch (error) {
      console.error("Error downloading CV:", error)
    }
  }

  const skills = {
    languages: ["C#", "Java", "Python", "JavaScript (ES6+)", "TypeScript", "Apex", "SOQL", "SQL"],
    frameworks: [".NET 8", ".NET 9", "ASP.NET Core", "Quartz", "Entity Framework", "MediatR", "Node.js"],
    cloud: ["Salesforce", "AWS (S3)"],
    databases: ["MySQL", "MongoDB", "Firebase Real-time DB", "SQL Server"],
    tools: ["Figma", "Postman", "Git", "Jira", "GitHub", "Swagger", "Confluence"],
  }

  const achievements = [
    { icon: Zap, title: "40%", subtitle: "Query Efficiency Improved" },
    { icon: Target, title: "30%", subtitle: "Transaction Errors Reduced" },
    { icon: Users, title: "25%", subtitle: "Operational Efficiency Increased" },
    { icon: Award, title: "90%+", subtitle: "Test Coverage Achieved" },
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/20 to-gray-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 40%)`,
          }}
        />
      </div>

      {/* Floating Particles - Only render on client side */}
      {isClient && (
        <div className="fixed inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-gray-600 bg-clip-text text-transparent"
            >
              Aqsa Shafiq
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Skills", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-500 relative ${
                    activeSection === item.toLowerCase() ? "text-blue-500" : "text-white/70"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-slate-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700 bg-clip-text text-transparent">
                Aqsa Shafiq
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl text-white/90 mb-4 font-light">Software Engineer</h2>
              <div className="flex justify-center items-center gap-4 text-blue-500/80">
                <Code className="w-6 h-6" />
                <span className="text-white/60">•</span>
                <span className="text-lg">Backend Developer</span>
                <span className="text-white/60">•</span>
                <Database className="w-6 h-6" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Crafting innovative software solutions with expertise in{" "}
              <span className="text-blue-500 font-semibold">Salesforce Commerce Cloud</span>,{" "}
              <span className="text-slate-600 font-semibold">.NET 8/9</span>, and{" "}
              <span className="text-gray-700 font-semibold">Backend APIs</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className="group bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-600 hover:to-slate-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadCV}
                className="border-2 border-blue-500/50 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500 px-8 py-4 rounded-full text-lg font-medium backdrop-blur-sm transition-all duration-300 group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
                  <CardContent className="p-6 bg-black/10">
                    <achievement.icon className="w-8 h-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-1">{achievement.title}</h3>
                    <p className="text-white/60 text-sm">{achievement.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-16 rounded-full" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500">
                  <CardContent className="p-8 bg-black/10">
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      I'm a passionate <span className="text-blue-500 font-semibold">Backend Developer</span> with
                      expertise in developing scalable APIs, e-commerce solutions, and system integrations. My journey
                      spans across cutting-edge technologies including{" "}
                      <span className="text-slate-600 font-semibold">.NET 8/9</span>,{" "}
                      <span className="text-gray-700 font-semibold">Salesforce Commerce Cloud</span>, and modern backend
                      frameworks.
                    </p>
                    <p className="text-white/80 text-lg leading-relaxed">
                      I specialize in optimizing system performance, implementing secure authentication mechanisms, and
                      creating innovative solutions that enhance user experience and drive operational efficiency.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-slate-600 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Backend Development</h3>
                    <p className="text-white/60">Scalable API and system architecture</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Cloud Solutions</h3>
                    <p className="text-white/60">Salesforce & AWS integrations</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">API Architecture</h3>
                    <p className="text-white/60">Scalable backend systems</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-16 rounded-full" />

            <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-600" />

              {/* Company Header */}
              <CardHeader className="pb-8 bg-gradient-to-r from-blue-500/5 to-slate-500/5">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-xl flex items-center justify-center">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl text-white mb-2">Software Engineer</CardTitle>
                        <CardDescription className="text-blue-400 text-xl font-semibold">Nestosh LLC</CardDescription>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-white/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">Nov 2023 – Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">Remote</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Full-time</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-500/20 to-slate-500/20 text-blue-300 border-blue-500/30 text-lg px-6 py-2 justify-center"
                    >
                      1+ Year Experience
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8 bg-black/10 p-8">
                {/* Key Technologies */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-400" />
                    Key Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      ".NET 8",
                      "CQRS",
                      "MediatR",
                      "Salesforce Commerce Cloud",
                      "Node.js",
                      "JavaScript",
                      "Apex",
                      "SOQL",
                      "Entity Framework Core",
                      "Quartz.NET",
                      "JWT",
                      "RESTful APIs",
                    ].map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Major Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    Key Achievements & Impact
                  </h3>

                  <div className="grid gap-6">
                    {[
                      {
                        icon: Database,
                        title: "API Development & Performance Optimization",
                        description:
                          "Designed and developed scalable APIs using .NET 8, CQRS, and MediatR with a focus on performance and maintainability",
                        impact: "40% improvement in query efficiency",
                        color: "blue",
                      },
                      {
                        icon: Cloud,
                        title: "E-commerce Solutions Architecture",
                        description:
                          "Engineered robust e-commerce solutions in Salesforce Commerce Cloud using Node.js and JavaScript, including payment gateway integrations",
                        impact: "25% increase in operational efficiency",
                        color: "slate",
                      },
                      {
                        icon: Users,
                        title: "Customer Experience Enhancement",
                        description:
                          "Architected and deployed the 'Order on Behalf of Customer' feature with advanced error handling and user experience optimization",
                        impact: "30% reduction in transaction errors",
                        color: "indigo",
                      },
                      {
                        icon: Target,
                        title: "Loyalty Program Implementation",
                        description:
                          "Spearheaded the design and execution of a comprehensive 4-phase Loyalty Program with advanced customer engagement features",
                        impact: "20% boost in customer engagement",
                        color: "gray",
                      },
                      {
                        icon: Zap,
                        title: "System Integration & Testing",
                        description:
                          "Optimized Apex code and fortified the SFDX project OMS-Shopify Connector with comprehensive testing and integration reliability",
                        impact: "90%+ test coverage achieved",
                        color: "blue",
                      },
                      {
                        icon: ExternalLink,
                        title: "API Performance & Security",
                        description:
                          "Developed and deployed high-performance RESTful APIs with JWT authentication and role-based authorization",
                        impact: "30% reduction in response times",
                        color: "slate",
                      },
                    ].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <Card className="bg-black/10 border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${
                                  achievement.color === "blue"
                                    ? "from-blue-500 to-blue-600"
                                    : achievement.color === "slate"
                                      ? "from-slate-500 to-slate-600"
                                      : achievement.color === "indigo"
                                        ? "from-indigo-500 to-indigo-600"
                                        : "from-gray-500 to-gray-600"
                                } rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                              >
                                <achievement.icon className="w-6 h-6 text-white" />
                              </div>

                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                                  <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                                    {achievement.title}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-500/20 text-green-400 border-green-500/30 text-sm w-fit"
                                  >
                                    {achievement.impact}
                                  </Badge>
                                </div>

                                <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                                  {achievement.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Responsibilities */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    Additional Responsibilities
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Built dynamic report generation system using Entity Framework Core",
                      "Implemented background jobs with Quartz.NET for order automation",
                      "Enhanced API security using JWT authentication and role-based authorization",
                      "Streamlined critical feature implementation for Unified Search and Zoovu Quiz",
                      "Drafted comprehensive system architecture documentation and diagrams",
                      "Drove key integrations in OMS implementation for seamless operations",
                    ].map((responsibility, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                          {responsibility}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-16 rounded-full" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-black/10">
                    <div className="flex flex-wrap gap-3">
                      {skills.languages.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-500/30 to-slate-500/30 text-white border-blue-400/50 hover:border-blue-300/70 transition-all duration-300 cursor-default font-semibold"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-r from-slate-600 to-gray-600 rounded-lg group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                      Frameworks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-black/10">
                    <div className="flex flex-wrap gap-3">
                      {skills.frameworks.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-slate-500/30 to-gray-500/30 text-white border-slate-400/50 hover:border-slate-300/70 transition-all duration-300 cursor-default font-semibold"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-lg group-hover:scale-110 transition-transform">
                        <Cloud className="w-6 h-6 text-white" />
                      </div>
                      Cloud & Systems
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-black/10">
                    <div className="flex flex-wrap gap-3">
                      {skills.cloud.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-600/30 to-indigo-500/30 text-white border-blue-500/50 hover:border-blue-400/70 transition-all duration-300 cursor-default font-semibold"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-r from-gray-600 to-slate-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      Databases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-black/10">
                    <div className="flex flex-wrap gap-3">
                      {skills.databases.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-gray-500/30 to-slate-500/30 text-white border-gray-400/50 hover:border-gray-300/70 transition-all duration-300 cursor-default font-semibold"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="md:col-span-2"
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-r from-slate-600 to-gray-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      Tools & Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-black/10">
                    <div className="flex flex-wrap gap-3">
                      {skills.tools.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-slate-600/30 to-gray-600/30 text-white border-slate-500/50 hover:border-slate-400/70 transition-all duration-300 cursor-default font-semibold"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                Education & Community
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-16 rounded-full" />

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-600" />
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">BS Computer Science</CardTitle>
                    <CardDescription className="text-blue-500 text-lg font-medium">
                      University of Management and Technology, Lahore
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 bg-black/10">
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      <span>Aug 2019 – Sep 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span className="text-white/80">
                        GPA: <span className="text-blue-500 font-semibold">3.81</span>
                      </span>
                    </div>
                    <p className="text-white/60 leading-relaxed">
                      Specialized in Mobile Application Development, Software Engineering, and Database Systems with
                      focus on modern development practices.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-600 to-gray-600" />
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Community Work</CardTitle>
                    <CardDescription className="text-slate-600 text-lg font-medium">HHRD, Lahore</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 bg-black/10">
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <span>Mar 2022 – Jul 2022</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-slate-600" />
                      <span className="text-white/80">
                        Impacted <span className="text-slate-600 font-semibold">500+</span> community members
                      </span>
                    </div>
                    <p className="text-white/60 leading-relaxed">
                      Collaborated on 5+ community-driven initiatives, improving access to essential services by 30%
                      through innovative technology solutions.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-16 rounded-full" />

            <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-600" />
              <CardContent className="p-8 bg-black/10">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-slate-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg">Email</p>
                        <p className="text-blue-500 hover:text-blue-400 transition-colors cursor-pointer">
                          aqsashafiq1001@gmail.com
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg">Phone</p>
                        <p className="text-slate-600 hover:text-slate-500 transition-colors cursor-pointer">
                          +923064455839
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg">Location</p>
                        <p className="text-gray-600">Lahore, Pakistan</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-blue-500/50 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500 flex-1 backdrop-blur-sm transition-all duration-300 group"
                        onClick={() => window.open("https://github.com/Aqsa1001", "_blank")}
                      >
                        <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        GitHub
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-slate-600/50 text-slate-600 hover:bg-slate-600/10 hover:border-slate-600 flex-1 backdrop-blur-sm transition-all duration-300 group"
                        onClick={() => window.open("https://www.linkedin.com/in/aqsa-shafiq-773635299", "_blank")}
                      >
                        <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        LinkedIn
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-600 hover:to-slate-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group"
                        size="lg"
                        onClick={() => window.open("mailto:aqsashafiq1001@gmail.com", "_blank")}
                      >
                        <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Send Email
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-white/60 text-center text-sm"
                    >
                      Available for freelance projects and full-time opportunities
                    </motion.p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/60"
          >
            © 2024 Aqsa Shafiq. Crafted with passion and modern web technologies.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
