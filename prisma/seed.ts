const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Function to hash password
  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  // Hash the common password
  const hashedPassword = await hashPassword('password');

  // Create some company accounts
  const company1 = await prisma.company.create({
    data: {
      name: 'Company One',
      email: 'company1@gmail.com',
      password: hashedPassword,
      image: 'https://via.placeholder.com/150',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Company Two',
      email: 'company2@gmail.com',
      password: hashedPassword,
      image: 'https://via.placeholder.com/150',
    },
  });

  // Student data
  const students = [
    { firstname: 'John', surname: 'Doe' },
    { firstname: 'Jane', surname: 'Smith' },
    { firstname: 'Alice', surname: 'Johnson' },
    { firstname: 'Bob', surname: 'Brown' },
    { firstname: 'Charlie', surname: 'Davis' },
    { firstname: 'Diana', surname: 'Miller' },
    { firstname: 'Eve', surname: 'Wilson' },
    { firstname: 'Frank', surname: 'Moore' },
    { firstname: 'Grace', surname: 'Taylor' },
    { firstname: 'Hank', surname: 'Anderson' },
    { firstname: 'Ivy', surname: 'Thomas' },
    { firstname: 'Jack', surname: 'Jackson' },
    { firstname: 'Kara', surname: 'White' },
    { firstname: 'Leo', surname: 'Harris' },
  ];

  // Create student accounts and posts
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const isActive = i % 2 === 0; // Make every other post inactive

    await prisma.student.create({
      data: {
        firstname: student.firstname,
        surname: student.surname,
        email: `${student.firstname.toLowerCase()}.${student.surname.toLowerCase()}@gmail.com`,
        password: hashedPassword,
        post: {
          create: {
            content: `Post content for ${student.firstname} ${student.surname}`,
            isActive: isActive,
            education: {
              create: [
                {
                  degree: `Degree ${i + 1}`,
                  institution: `Institution ${i + 1}`,
                  yearOfGraduation: 2019 + i,
                },
              ],
            },
            workExperiences: {
              create: [
                {
                  company: `Company ${i + 1}`,
                  position: `Position ${i + 1}`,
                  location: `City ${i + 1}`,
                  startDate: `2020-01-01`,
                  endDate: `2020-06-01`,
                },
              ],
            },
            skills: {
              create: [
                {
                  skillName: `Skill ${i + 1}`,
                  level: 'Intermediate',
                },
              ],
            },
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
