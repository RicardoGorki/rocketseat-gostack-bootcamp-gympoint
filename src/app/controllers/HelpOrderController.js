import * as Yup from 'yup';
import { startOfDay, format, parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';

import HelpOrder from '../models/HelpOrder';
import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const student_id = req.params.id;

    const helpOrder = await HelpOrder.findAll({ where: { student_id } });

    return res.json(helpOrder);
  }

  async show(req, res) {
    const helpOrder = await HelpOrder.findAll({ where: { answer_at: null } });
    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student_id = req.params.id;

    const studentExists = await Registration.findOne({ where: { student_id } });

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }
    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help Order does not exists' });
    }
    const { answer } = req.body;
    const answer_at = startOfDay(new Date());

    await helpOrder.update({
      answer,
      answer_at,
    });

    const helpOrderMail = await HelpOrder.findByPk(helpOrder.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(HelpOrderMail.key, {
      helpOrderMail,
    });

    return res.json({ helpOrder });
  }
}

export default new HelpOrderController();
