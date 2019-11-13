import { startOfWeek, endOfWeek, parseISO, isBefore, subDays } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Checkin from '../schemas/Checkin';

import Registration from '../models/Registration';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.id;
    const checkins = await Checkin.find({ student_id });

    const studentExists = await Registration.findOne({ where: { student_id } });

    if (!studentExists) {
      return res
        .status(401)
        .json({ error: 'Student does not have an enrollment.' });
    }

    return res.json(checkins);
  }

  async store(req, res) {
    const student_id = req.params.id;

    await Registration.findByPk(student_id);

    const searchDate = Number(new Date());

    const checkin = await Checkin.create({
      student_id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
