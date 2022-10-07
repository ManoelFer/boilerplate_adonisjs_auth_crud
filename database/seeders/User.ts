import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'admin@admin.com',
        password: 'admin',
      },
      {
        email: 'ari@email.com',
        password: 'admin',
      },
      {
        email: 'manoel@email.com',
        password: 'admin',
      },
    ])
  }
}
