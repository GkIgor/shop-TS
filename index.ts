import CryptoJS from 'crypto-js';
import './style.css';

const toggle = document.getElementById('toggle-img') as HTMLElement;
const cards = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
const srcItens: string[] = [
  'https://img.freepik.com/fotos-gratis/cidade-inteligente-futurista-com-tecnologia-de-rede-global-5g_53876-98438.jpg?w=900&t=st=1680357874~exp=1680358474~hmac=5a943b4c2c7e27798c1ba7e99ea69b58fdccec5fdf190e10947d68ecfbce0312',
  'https://img.freepik.com/fotos-gratis/conceito-de-rpa-com-tela-de-toque-de-mao-embacada_23-2149311914.jpg?w=900&t=st=1680357914~exp=1680358514~hmac=4eab72573b88d854bb1a41305140211f2063d3443e992c6277c8d7ffe07284ca',
  'https://img.freepik.com/vetores-gratis/ilustracao-de-rede-neural-cinza_53876-78769.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/vetores-gratis/particula-de-tecnologia-abstrata-realista-de-fundo_23-2148431735.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/vetores-gratis/fundo-a-tecnologia-moderna_1035-4664.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/vetores-gratis/fundo-de-malha-abstrato-cartao-de-estilo-de-tecnologia-futurista-linhas-pontos-planos-no-espaco-3d_1217-3865.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/renderizando-um-fundo-futurista-abstrato-com-luzes-brilhantes-de-neon-azul-e-laranja_181624-19807.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/antecedentes-de-energia-nuclear-de-ia-inovacao-futura-de-tecnologia-disruptiva_53876-129783.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/vetores-gratis/fundo-gradiente-de-conexao-de-rede_23-2148865392.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/homem-tiro-medio-usando-oculos-vr_23-2149126949.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/codificacao-de-programa-de-computador-na-tela_53876-138060.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/computador-laptop-cinza-ligado_400718-47.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/plano-de-fundo-de-programacao-com-pessoa-trabalhando-com-codigos-no-computador_23-2150010125.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/fotos-gratis/especialista-em-ti-verificando-o-codigo-no-computador-no-escritorio-escuro-a-noite_1098-18699.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
  'https://img.freepik.com/vetores-gratis/desenvolvimento-de-aplicativos-para-desktop-e-smartphone_23-2148683810.jpg?size=626&ext=jpg&ga=GA1.2.1661565719.1680292057&semt=robertav1_2_sidr',
];

//Gera chave de criptografia
function generateKey(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function loadPage() {
  await cards.forEach((image) => {
  const randomIndex: number =  Math.floor(Math.random() * 14);
  image.src = srcItens[randomIndex];
  });
}

window.addEventListener('load', loadPage); //Atribui o src das imagens no carregamento da janela

toggle.addEventListener('click', () => {
  try {
    const fontImg: any = JSON.parse(localStorage.getItem('fontImg') || '{"freepik": false, "unsplash": false}'); //Resgata config de imagens do local storage
    fontImg.freepik = !fontImg.freepik;
    fontImg.unsplash = !fontImg.unsplash;
    localStorage.setItem('fontImg', JSON.stringify(fontImg));  //Envia config de imagens para o local storage
    if (! fontImg.freepik) {
        const apikey: string | null = prompt('Please enter your Unsplash API key:');
        let apikeyDecrypted: string | undefined;
        if (apikey) {
          const encryptedApiKey: string = CryptoJS.SHA256(apikey).toString(); //Criptografa chave API
          sessionStorage.setItem('unsplashAPIKey', encryptedApiKey); //Salva chave API
        } else {
          fontImg.unsplash = false;
          throw new Error('Blank API key');
        }
        const encryptedKey: string | null = sessionStorage.getItem('unsplashAPIKey'); //Busca chave API
        if (encryptedKey) {
          const bytes: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encryptedKey, generateKey(32)); //Descriptografa chave API
          const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}`;
          apikeyDecrypted = bytes.toString(CryptoJS.enc.Utf8);
          cards.forEach((image) => {
            image.src = apiUrl;
          })
          if (!apikeyDecrypted) {
            fontImg.unsplash = false;
            throw new Error('Invalid API key');
          }
        } else {
          fontImg.unsplash = false;
          throw new Error('No encrypted API key found in local storage');
        }
    } // if fontImg
  } catch (error) {
    console.log(error);
    cards.forEach((image) => {
      const randomIndex: number =  Math.floor(Math.random() * 14);
      image.src = srcItens[randomIndex];
      }); // forEach
  } // catch event
}); // addEventListener