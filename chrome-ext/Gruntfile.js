module.exports = function( grunt ){
    
    grunt.initConfig({
		uglify: {
			index_js: {
				options: {
					sourceMap: "../lib/js/jquery-2.0.3.min.map",
				},
				files: {
					"build/index.js": [
					"lib/js/jquery-2.0.3.min.js",
					"js/index.js"
					]
				}
			}
		},
		less: {
			production: {
				options:{
					paths: [
					"css",
					"lib/css"
					],
					yuicompress: false
				},
				files: {
					"build/styles.css": [
					"lib/css/normalize.css",
					"css/grid.less",
					"css/mobile.less",
					"css/styles.less"
					]
				}
			}
		},
		watch: {
			scripts: {
				files: ["js/*.js", "css/*.less"],
				tasks: ["default"],
				options: {
					spawn: false,
				},
			}
		}
	});
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    
    grunt.registerTask("default", ["uglify", "less"]);
};