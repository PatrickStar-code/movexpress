import {
  MapPinIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  TruckIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../../../public/img/benefit-one.png";
import benefitTwoImg from "../../../../public/img/benefit-two.png";

export const benefitOne = {
  title: "Por que escolher a MoveXpress?",
  desc: "A MoveXpress facilita entregas rápidas e seguras, conectando você a entregadores disponíveis. Tenha total controle e transparência no envio de suas encomendas.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Facilidade e praticidade",
      desc: "Solicite entregas com poucos cliques e acompanhe o status em tempo real.",
      icon: <MapPinIcon />, // Ícone de localização para representar rastreamento
    },
    {
      title: "Entrega rápida e segura",
      desc: "Nossos entregadores seguem as melhores rotas para garantir agilidade e segurança.",
      icon: <RocketLaunchIcon />, // Ícone de foguete para simbolizar rapidez
    },
    {
      title: "Conecte-se a entregadores confiáveis",
      desc: "Escolha entre diversos entregadores e avalie suas experiências.",
      icon: <UserGroupIcon />, // Ícone de grupo para representar entregadores confiáveis
    },
  ],
};

export const benefitTwo = {
  title: "Mais vantagens para você",
  desc: "Com a MoveXpress, você tem uma plataforma eficiente e intuitiva para solicitar entregas e acompanhar tudo em tempo real. Confira mais benefícios:",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Entregas sob demanda",
      desc: "Peça um entregador a qualquer momento e receba sua encomenda rapidamente.",
      icon: <TruckIcon />,
    },
    {
      title: "Acompanhe em tempo real",
      desc: "Veja o status da sua entrega a qualquer momento pelo nosso app.",
      icon: <ClockIcon />,
    },
    {
      title: "Segurança garantida",
      desc: "Trabalhamos com entregadores verificados para garantir sua tranquilidade.",
      icon: <ShieldCheckIcon />,
    },
  ],
};
