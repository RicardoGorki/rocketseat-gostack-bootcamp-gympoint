import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CreationMail {
  get key() {
    return 'CreationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Criação de Matricula',
      template: 'creation',
      context: {
        student: registration.student.name,
        plan: registration.student.name,
        duration: registration.student.name,
        price: registration.student.name,
        start_date: format(
          parseISO(registration.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CreationMail();
