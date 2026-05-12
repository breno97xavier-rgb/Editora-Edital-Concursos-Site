import React from 'react';

export default function PrivacidadePage() {
  return (
    <main className="bg-branco py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-titulo text-4xl md:text-5xl font-bold text-azul-profundo mb-4">
          Política de Privacidade
        </h1>
        <p className="text-cinza-medio mb-12">
          Última atualização: maio de 2026 — Conforme Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
        </p>

        <div className="prose prose-lg max-w-none text-cinza-escuro space-y-6">

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">1. Quem somos</h2>
            <p>
              Esta Política de Privacidade descreve como a <strong>WB2 EMPREENDIMENTOS LTDA</strong>, CNPJ 65.395.470/0001-47, nome fantasia "Editora Edital Concursos", coleta, utiliza e protege seus dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">2. Dados que coletamos</h2>
            <p>Coletamos os seguintes dados pessoais durante seu uso do nosso site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dados de cadastro/compra:</strong> nome completo, email e telefone — fornecidos voluntariamente no checkout ou formulário de contato.</li>
              <li><strong>Dados de pagamento:</strong> processados diretamente pela plataforma Kiwify. <strong>Não armazenamos</strong> dados de cartão de crédito ou informações bancárias em nossos servidores.</li>
              <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência — coletados por cookies e ferramentas de analytics.</li>
              <li><strong>Newsletter:</strong> apenas email, se você se cadastrar voluntariamente.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">3. Como usamos seus dados</h2>
            <p>Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processar suas compras e entregar os materiais adquiridos;</li>
              <li>Enviar atualizações relacionadas ao material adquirido (revisões de edital, etc.);</li>
              <li>Responder solicitações de suporte ou contato;</li>
              <li>Enviar comunicações de marketing, apenas se você consentiu (newsletter);</li>
              <li>Cumprir obrigações legais (fiscais, contábeis, regulatórias);</li>
              <li>Melhorar a experiência do site através de analytics agregados e anônimos.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">4. Base legal para o tratamento</h2>
            <p>Tratamos seus dados com base nas seguintes hipóteses legais da LGPD:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Execução de contrato</strong> (Art. 7º, V) — para processar compras e entregar materiais;</li>
              <li><strong>Consentimento</strong> (Art. 7º, I) — para envio de newsletter e marketing;</li>
              <li><strong>Cumprimento de obrigação legal</strong> (Art. 7º, II) — para emissão de notas fiscais e cumprimento regulatório;</li>
              <li><strong>Legítimo interesse</strong> (Art. 7º, IX) — para analytics agregados de melhoria do serviço.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">5. Compartilhamento de dados</h2>
            <p>Compartilhamos seus dados apenas com:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Kiwify</strong> — processamento de pagamentos e entrega de produtos digitais;</li>
              <li><strong>Provedores de email</strong> — para envio de comunicações operacionais;</li>
              <li><strong>Autoridades públicas</strong> — apenas quando legalmente exigido (por exemplo, ordem judicial).</li>
            </ul>
            <p><strong>Não vendemos seus dados</strong> para terceiros sob nenhuma hipótese.</p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">6. Cookies</h2>
            <p>Utilizamos cookies para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies essenciais:</strong> necessários para o funcionamento do site (sessão, segurança);</li>
              <li><strong>Cookies de analytics:</strong> para entender o uso do site de forma agregada (Google Analytics, Meta Pixel quando ativos);</li>
              <li><strong>Cookies de marketing:</strong> para mensurar campanhas pagas, apenas quando você consente.</li>
            </ul>
            <p>Você pode desabilitar cookies nas configurações do seu navegador, mas isso pode afetar funcionalidades do site.</p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">7. Retenção de dados</h2>
            <p>Mantemos seus dados pelo tempo necessário para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cumprir as finalidades de coleta (entrega do material, suporte);</li>
              <li>Atender obrigações legais (5 anos para dados fiscais);</li>
              <li>Exercer direitos em processos administrativos ou judiciais.</li>
            </ul>
            <p>Após esses prazos, os dados são anonimizados ou excluídos.</p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">8. Seus direitos como titular</h2>
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Confirmação:</strong> saber se tratamos seus dados;</li>
              <li><strong>Acesso:</strong> obter cópia dos dados que temos sobre você;</li>
              <li><strong>Correção:</strong> atualizar dados incompletos, inexatos ou desatualizados;</li>
              <li><strong>Anonimização ou eliminação:</strong> de dados desnecessários ou tratados com base em consentimento;</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado;</li>
              <li><strong>Revogação de consentimento:</strong> retirar consentimento para tratamentos baseados nele;</li>
              <li><strong>Oposição:</strong> opor-se a tratamentos com base em legítimo interesse.</li>
            </ul>
            <p>Para exercer qualquer direito, entre em contato via email: <strong>editoraeditalconcursos@gmail.com</strong></p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">9. Segurança dos dados</h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda, alteração ou destruição. Apesar disso, nenhum system é 100% seguro — informe-nos imediatamente se suspeitar de qualquer incidente envolvendo seus dados.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">10. Encarregado de Dados (DPO)</h2>
            <p>
              Para questões específicas sobre tratamento de dados pessoais, entre em contato com nosso responsável pela proteção de dados:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> editoraeditalconcursos@gmail.com</li>
              <li><strong>Assunto:</strong> "LGPD — [seu assunto]"</li>
            </ul>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">11. Alterações nesta Política</h2>
            <p>
              Esta Política pode ser atualizada periodicamente. Notificaremos mudanças significativas por email ou aviso no site. Recomendamos revisar esta página regularmente.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">12. Contato</h2>
            <p>Em caso de dúvidas:</p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> editoraeditalconcursos@gmail.com</li>
              <li><strong>WhatsApp:</strong> (41) 98842-0201</li>
              <li><strong>Instagram:</strong> @editoraeditalconcursos</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
