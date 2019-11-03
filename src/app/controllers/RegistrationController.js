import * as Yup from 'yup';
import { startOfMonth, endOfMonth } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.send();
  }
}

export default new RegistrationController();
