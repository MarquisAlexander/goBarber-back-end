import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderDayAvailability from './ListProviderDayAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeUsersRepository = new FakeUsersRepository();

        listProviderDayAvailability = new ListProviderDayAvailability(fakeAppointmentsRepository);
    });

    it('should be able to list the Day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user_id',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user_id',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 5,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, availability: false },
            { hour: 9, availability: false },
            { hour: 10, availability: false },
            { hour: 14, availability: false },
            { hour: 15, availability: false },
        ]))
    });
});