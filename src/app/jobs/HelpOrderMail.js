import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrderMail } = data;

    await Mail.sendMail({
      to: `${helpOrderMail.student.name} <${helpOrderMail.student.email}>`,
      subject: 'Criação de Matricula',
      template: 'helporder',
      context: {
        student: helpOrderMail.student.name,
        duration: helpOrderMail.plan.duration,
        price: helpOrderMail.price,
        start_date: format(
          parseISO(helpOrderMail.start_date),
          "dd'/'MM'/'yyyy' às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new HelpOrderMail();
