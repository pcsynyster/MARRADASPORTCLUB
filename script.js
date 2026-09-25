document.addEventListener('DOMContentLoaded', () => {
  // Inicialização dos ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Controlo do Menu Móvel
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Seletor Interativo de Espaço / Modalidade
  const sportButtons = document.querySelectorAll('.sport-btn');
  const hiddenInput = document.getElementById('selected_sport');

  sportButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sportButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      if (hiddenInput) {
        hiddenInput.value = button.getAttribute('data-sport');
      }
    });
  });

  // Envio Inteligente para WhatsApp
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalidade = document.getElementById('selected_sport').value;
      const nome = document.getElementById('user_name').value.trim();
      const telefone = document.getElementById('user_phone').value.trim();
      const data = document.getElementById('booking_date').value;
      const turno = document.getElementById('booking_shift').value;
      const observacoes = document.getElementById('booking_notes').value.trim();

      let dataFormatada = data;
      if (data) {
        const partes = data.split('-');
        if (partes.length === 3) {
          dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
      }

      // Códigos Unicode dos emojis para garantir compatibilidade perfeita no telemóvel
      const iconReserva = String.fromCodePoint(0x1F3AF);
      const iconUser = String.fromCodePoint(0x1F464);
      const iconPhone = String.fromCodePoint(0x1F4F1);
      const iconDate = String.fromCodePoint(0x1F4C5);
      const iconClock = String.fromCodePoint(0x23F0);
      const iconNotes = String.fromCodePoint(0x1F4DD);

      let linhas = [
        "*NOVA SOLICITAÇÃO DE RESERVA - MARRADA SPORT CLUB*",
        "",
        `${iconReserva} *Espaço / Modalidade:* ${modalidade}`,
        `${iconUser} *Nome do Responsável:* ${nome}`,
        `${iconPhone} *WhatsApp:* ${telefone}`,
        `${iconDate} *Data Pretendida:* ${dataFormatada}`,
        `${iconClock} *Turno / Período:* ${turno}`
      ];

      if (observacoes) {
        linhas.push(`${iconNotes} *Observações / Convidados:* ${observacoes}`);
      }

      linhas.push("", "_Mensagem enviada através do formulário do site oficial Marrada._");

      const mensagemFinal = linhas.join("\n");
      const numeroOficial = "5584991263957";

      // Abre a API oficial do WhatsApp diretamente
      const urlFinal = `https://api.whatsapp.com/send?phone=${numeroOficial}&text=${encodeURIComponent(mensagemFinal)}`;
      window.open(urlFinal, '_blank');
    });
  }
});