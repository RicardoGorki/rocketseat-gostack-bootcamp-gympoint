import { startOfDay, endOfDay, subDays } from 'date-fns';

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

    const startDay = startOfDay(new Date());
    const lastWeek = subDays(startDay, 7);

    const checkins = await Checkin.find({ student_id })
      .gte('createdAt', startOfDay(lastWeek))
      .lte('createdAt', endOfDay(startDay))
      .countDocuments();

    if (checkins > 4) {
      return res.status(401).json({ error: 'You shall not pass' });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
