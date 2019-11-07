import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CreationMail {
  get key() {
    return 'CreationMail';
  }

  async handle({ data }) {
    const { registrationMail } = data;

    await Mail.sendMail({
      to: `${registrationMail.student.name} <${registrationMail.student.email}>`,
      subject: 'Criação de Matricula',
      template: 'creation',
      context: {
        student: registrationMail.student.name,
        plan: registrationMail.plan.title,
        duration: registrationMail.plan.duration,
        price: registrationMail.price,
        start_date: format(
          parseISO(registrationMail.start_date),
          "dd'/'MM'/'yyyy' às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registrationMail.end_date),
          "dd'/'MM'/'yyyy' às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CreationMail();
