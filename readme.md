# Marrada Sport Club ⚽🎾

Landing page institucional e sistema de pré-reserva desenvolvido para o **Marrada Sport Club**, o maior complexo desportivo de Parnamirim - RN.

O projeto foi concebido com foco em alta performance, identidade visual moderna (estética verde floresta e laranja do clube), apresentação de infraestruturas completas e conversão direta via WhatsApp.

---

##  Funcionalidades Principais

- **Apresentação de Infraestrutura (Bento Grid):**
  - 09 Quadras de Areia para Beach Tennis, Futevôlei e Vôlei de Praia.
  - O "Marradão" (campo oficial com relva natural tratada).
  - Complexo Fut7 Society em relva sintética de alto impacto.
  - Salão de Festas, Confraternizações e Área Kids com mini campo infantil.
  - Futmesa e áreas de resenha.
  - 02 Churrasqueiras completas e espaço gourmet para o pós-jogo.
- **Divulgação de Torneios e Ofertas:**
  - Secção exclusiva para a **Copa Fut7 Empresarial**.
  - Destaque para promoções de Beach Tennis (quarteto/4x4).
  - Galeria de Atletas Premiados e destaques desportivos.
- **Agendamento Inteligente via WhatsApp:**
  - Formulário interativo para seleção de modalidade/espaço, nome, contacto, data pretendida e turno.
  - Formatação e codificação da mensagem enviada diretamente para a equipa de atendimento via API do WhatsApp.
- **Design Totalmente Responsivo:**
  - Layout otimizado para telemóveis, tablets e computadores.
  - Menu móvel dedicado e botão flutuante persistente de contacto.

---

## Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e acessível.
- **Tailwind CSS (CDN):** Estilização utilitária moderna com paleta de cores personalizada (`forest` e `marrada-orange`).
- **JavaScript (ES6+):** Gestão de eventos, validação de campos e integração de formulário para WhatsApp.
- **Lucide Icons:** Conjunto de ícones leves e consistentes.
- **Google Fonts:** Tipografias *Outfit* e *Plus Jakarta Sans*.

---

## 📁 Estrutura de Pastas

```text
marradasportclub/
├── assets/                  # Imagens locais do complexo, logótipos e artes
│   ├── logo.png
│   ├── futsetvistacima.png
│   ├── beach-tennis.jpg
│   ├── marradao.jpg
│   ├── futsetcampo2.png
│   ├── campokids.png
│   ├── churrascaria01.png
│   └── futempresalogo.png
├── index.html               # Página principal do projeto
├── style.css                # Ajustes finos de CSS e fontes
├── script.js               # Lógica do menu móvel e disparo para WhatsApp
└── README.md                # Documentação do projeto