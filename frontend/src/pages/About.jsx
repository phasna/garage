import { Shield, Award, Users, Clock, CheckCircle, Star } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Années d'expérience", value: "15+" },
    { label: "Véhicules en flotte", value: "150+" },
    { label: "Clients satisfaits", value: "10,000+" },
    { label: "Villes desservies", value: "25+" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Sécurité",
      description:
        "Tous nos véhicules sont régulièrement contrôlés et entretenus par des professionnels qualifiés.",
    },
    {
      icon: Award,
      title: "Qualité",
      description:
        "Nous sélectionnons uniquement des véhicules récents et bien équipés pour votre confort.",
    },
    {
      icon: Users,
      title: "Service client",
      description:
        "Notre équipe dédiée est à votre écoute 24h/24 pour vous accompagner dans vos déplacements.",
    },
    {
      icon: Clock,
      title: "Disponibilité",
      description:
        "Service de location flexible avec prise en charge et retour 7j/7, 24h/24.",
    },
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Directrice générale",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&q=80",
      description: "15 ans d'expérience dans l'industrie automobile",
    },
    {
      name: "Pierre Martin",
      role: "Responsable flotte",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      description: "Expert en maintenance et qualité véhicules",
    },
    {
      name: "Sarah Johnson",
      role: "Service client",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      description: "Spécialisée dans l'accompagnement client",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            À propos de GarageLocation
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous sommes votre partenaire de confiance
            pour tous vos besoins de mobilité. Découvrez notre histoire, nos
            valeurs et notre engagement envers l'excellence.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre histoire
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Fondée en 2009 par une équipe passionnée d'automobile,
                  GarageLocation est née d'une vision simple : démocratiser
                  l'accès à des véhicules de qualité pour tous.
                </p>
                <p>
                  Ce qui a commencé comme une petite entreprise familiale avec
                  seulement 10 véhicules est devenu aujourd'hui l'un des leaders
                  de la location de véhicules en France, avec plus de 150
                  véhicules dans notre flotte.
                </p>
                <p>
                  Notre succès repose sur trois piliers fondamentaux : la
                  qualité de nos véhicules, l'excellence de notre service
                  client, et notre engagement envers l'innovation et la
                  durabilité.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80"
                alt="Notre équipe"
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos valeurs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ces valeurs guident chacune de nos actions et décisions au
              quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Notre mission
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Offrir à nos clients une expérience de location exceptionnelle en
            mettant à leur disposition des véhicules fiables, modernes et
            adaptés à leurs besoins, tout en garantissant un service
            personnalisé et professionnel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Engagement qualité
              </h4>
              <p className="text-sm text-gray-600">
                Véhicules entretenus selon les plus hauts standards
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Satisfaction client
              </h4>
              <p className="text-sm text-gray-600">
                98% de nos clients nous recommandent
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Sécurité garantie
              </h4>
              <p className="text-sm text-gray-600">
                Assurance tous risques et assistance 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre équipe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rencontrez les experts qui rendent votre expérience exceptionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Découvrez pourquoi des milliers de clients nous font confiance pour
            leurs déplacements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#vehicles"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Voir nos véhicules
            </a>
            <a
              href="/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
