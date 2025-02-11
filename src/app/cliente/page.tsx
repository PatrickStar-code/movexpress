import { Hero } from "./_components/Hero";
import { SectionTitle } from "./_components/SectionTitle";
import { Benefits } from "./_components/Benefits";
import { Testimonials } from "./_components/Testimonials";
import { Cta } from "./_components/Cta";

import { benefitOne } from "./_components/data";
import { benefitTwo } from "./_components/data";
import { Faq } from "./_components/Faq";
import { VideoPlayer } from "./_components/Video";
import { Container } from "./_components/Container";
import { auth } from "@/auth";
import { Footer } from "./_components/Footer";

export default async function ClientPage() {
  const session = await auth();
  let isLogged = false;
  if (session) {
    isLogged = true;
  }

  return (
    <main className="bg-background overflow-x-hidden">
      <Container>
        <Hero isLoged={isLogged} />
        <SectionTitle
          preTitle="Vantagens da MoveXpress"
          title="Por que escolher a nossa plataforma?"
        >
          A MoveXpress conecta você a entregadores de forma rápida e segura.
          Solicite coletas e entregas com facilidade, acompanhando tudo em tempo
          real.
        </SectionTitle>
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        <SectionTitle
          preTitle="Assista ao vídeo"
          title="Veja como é fácil enviar e receber entregas"
        >
          Descubra como a MoveXpress pode tornar suas entregas mais rápidas e
          seguras. No vídeo, mostramos como solicitar um entregador, acompanhar
          sua encomenda e aproveitar todos os benefícios da nossa plataforma.
        </SectionTitle>
        <VideoPlayer videoId="0O2aHWkGhG4" />
        <SectionTitle
          preTitle="Depoimentos"
          title="Veja o que nossos clientes estão dizendo"
        >
          Depoimentos são uma excelente maneira de aumentar a confiança e a
          visibilidade da sua marca. Use esta seção para destacar a experiência
          positiva de nossos clientes com a MoveXpress.
        </SectionTitle>
        <Testimonials />
        <SectionTitle preTitle="FAQ" title="Perguntas Frequentes">
          Aqui você encontra as respostas para as dúvidas mais comuns sobre
          nossos serviços. Estamos aqui para garantir que sua experiência com a
          MoveXpress seja simples e sem preocupações.
        </SectionTitle>
        <Faq />
        <Cta isLoged={isLogged} />
        <Footer />
      </Container>
    </main>
  );
}
