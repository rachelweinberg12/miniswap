/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'fredoka-one': ['Fredoka One', 'cursive'],
				dosis: ['Dosis', 'sans-serif']
			}
		}
	},
	plugins: []
};
