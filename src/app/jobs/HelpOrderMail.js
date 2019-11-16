import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrderMail } = data;

    await Mail.sendMail({
      to: `${helpOrderMail.student.name} <${helpOrderMail.student.email}>`,
      subject: 'Pedido de Ajudo',
      template: 'helporder',
      context: {
        name: helpOrderMail.student.name,
        question: helpOrderMail.question,
        answer: helpOrderMail.answer,
      },
    });
  }
}

export default new HelpOrderMail();
