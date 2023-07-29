import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = Human.findOne({
	where: { humanId: 2 }
});

// Get the first animal whose species is "fish"
export const query2 = Animal.findOne({
	where: { species: "fish" }
});

// Get all animals belonging to the human with primary key 5
export const query3 = Animal.findAll({
	where: { humanId: 5 }
});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = Animal.findAll({
	where: { birthYear: { [Op.gt]: 2015 } }
});

// Get all the humans with first names that start with "J"
export const query5 = Human.findAll({
	where: { fname: { [Op.startsWith]: "J" } }
});

// Get all the animals who don't have a birth year
export const query6 = Animal.findAll({
	where: { birthYear: { [Op.is]: null } }
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = Animal.findAll({
	where: { species: { [Op.or]: ["fish", "rabbit"] } }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = Human.findAll({
	where: { email: { [Op.notLike]: "%gmail%" } }
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
	let directory = [];

	const people = await Human.findAll();

	for (const person of people) {
		directory.push(person.getFullName());

		const pets = await person.getAnimals();

		pets.forEach(pet => {
			directory.push(`- ${pet.name}, ${pet.species}`);
		});
	}

	console.log(directory.join("\n"));
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
	const humans = new Set();

	const animals = await Animal.findAll({
		where: { species }
	});

	for (const pet of animals) {
		const person = await Human.findOne({
			where: { humanId: pet.humanId }
		});

		humans.add(person.getFullName());
	}

	return humans;
}
