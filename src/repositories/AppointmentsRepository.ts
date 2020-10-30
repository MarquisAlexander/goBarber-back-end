import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        // percorrendo o arrau de appointments com o .find e verificando se a hora do parsedDate
        // já existe no array ou não 
    const findAppointment = await this.findOne({
        where: {date },
    });

    return findAppointment || null;
    }
}

export default AppointmentsRepository;