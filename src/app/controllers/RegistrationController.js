import * as Yup from 'yup';
import { startOfHour, addMonths, parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import CreationMail from '../jobs/CreationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findOne({
      where: { id: student_id },
    });

    if (!studentExists) {
      return res.status(400).json({ error: 'User does not exists.' });
    }

    const planExists = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const studentPlansExists = await Registration.findOne({
      where: { student_id },
    });

    if (studentPlansExists && plan_id !== false) {
      return res.status(400).json({ error: 'Student already has a plan' });
    }

    const startDate = startOfHour(parseISO(start_date));

    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = planExists;

    const end_date = addMonths(startDate, plan.duration);

    const price = plan.duration * plan.price;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(CreationMail.key, {
      registration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;
    const planExists = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const startDate = startOfHour(parseISO(start_date));

    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = planExists;

    const end_date = addMonths(startDate, plan.duration);

    const price = plan.duration * plan.price;

    const registration = await Registration.findByPk(id);
    await registration.update({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    return res.json(registration);
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists.' });
    }

    await registration.destroy();

    return res.send({ ok: 'true' });
  }
}

export default new RegistrationController();
