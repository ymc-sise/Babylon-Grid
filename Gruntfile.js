module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dev: {
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: ['*.{scss, sass}'],
					dest: '.tmp/stylesheets',
					ext: '.css'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: ['*.{scss, sass}'],
					dest: 'dist/css',
					ext: '.css'
				}],
				options: {
					style: 'compressed'
				}
			}
		},
		jshint: {
			scripts: ['src/javascript/jquery.babylongrid.js'],
			gruntfile: ['Gruntfile.js']
		},
		copy: {
			dev: {
				files: [{
					expand: true,
					cwd: 'bower_components/jquery/dist/',
					src: 'jquery.min.js',
					dest: '.tmp/javascript',
					flatten: true,
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'src/javascript',
					src: '*.js',
					dest: '.tmp/javascript',
					flatten: true,
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'src',
					src: 'index.html',
					dest: '.tmp',
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'src/css',
					src: '*.css',
					dest: '.tmp/stylesheets',
					flatten: true,
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'src/images',
					src: '**',
					dest: '.tmp/images',
					flatten: true,
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'src/fonts',
					src: '**',
					dest: '.tmp/fonts',
					flatten: true,
					filter: 'isFile'
				}]
			},
		},
		connect: {
			server: {
				options: {
					hostname: '127.0.0.1',
					port: 1337,
					base: '.tmp'
				}
			}
		},
		watch: {
			scripts: {
				files: 'src/javascript/jquery.babylongrid.js',
				tasks: ['jshint:scripts', 'copy:dev'],
			},
			sass: {
				files: 'src/sass/*.{sass, scss}',
				tasks: ['sass:dev']
			},
			css: {
				files: 'src/css/*.css',
				tasks: ['copy:dev']
			},
			html: {
				files: 'src/index.html',
				tasks: ['copy:dev']
			},
			options: {
				livereload: true
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('dev', ['jshint', 'sass:dev', 'copy:dev']);
	grunt.registerTask('serve', ['dev', 'connect:server', 'watch']);
	grunt.registerTask('server', ['serve']);
	grunt.registerTask('dist', ['jshint', 'sass:dist', 'uglify:scripts']);
	grunt.registerTask('default', ['dist']);
};
