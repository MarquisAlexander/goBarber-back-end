import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeUsersRepository = new FakeUsersRepository();

        listProviderMonthAvailability = new ListProviderMonthAvailability(fakeAppointmentsRepository);
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user_id',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user_id',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            user_id: 'user_id',
            provider_id: 'user',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, availability: true },
            { day: 20, availability: false },
            { day: 21, availability: false },
            { day: 22, availability: true },
        ]))
    });
});