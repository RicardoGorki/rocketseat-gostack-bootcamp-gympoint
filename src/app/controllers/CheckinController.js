import { startOfWeek } from 'date-fns';
import Checkin from '../schemas/Checkin';
import Student from '../models/Student';
import Registration from '../models/Registration';

class CheckinController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const student_id = req.params.id;

    await Registration.findByPk(student_id);

    const checkin = await Checkin.create({
      student_id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
