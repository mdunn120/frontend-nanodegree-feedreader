/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //http://jasmine.github.io/2.1/introduction.html
        it('are URLs defined', function() {
            for (i = 0 ; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed).toBeDefined();
                expect(Object.keys(feed)).toContain("url");
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('are names defined', function() {
            for (i = 0 ; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed).toBeDefined();
                expect(Object.keys(feed)).toContain("name");
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Write a new test suite named "The menu" */

    describe("The menu", function() {


        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         //Add the hasclass jquery method so it checks if it has the class, not necessary that it has 
         //to be the only class
        it("is hidden by default", function() {
            var body = $('body');
           // expect(body.attr('class')).toBe('menu-hidden');
           expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
  

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("menu changes visibility when the menu is clicked", function() {
            var menuIcon = $('.menu-icon-link');
            var body = $('body');
            //Simulationg first click
            menuIcon.click();
            //Update based on review comments to use hasclass 
            //expect(body.attr('class')).toBe('');
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            //simulationg second click
            menuIcon.click();
            //update based on review comments to use hasClass and toBeTruthy
            //expect(body.attr('class')).toBe('menu-hidden');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* Write a new test suite named "Initial Entries" */
     describe(" Initial Entries ", function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            loadFeed(0, function() { done(); });
        });

        it("At least one initial entry when loadFeed is called.", function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();   
        });
    });
    /* Write a new test suite named "New Feed Selection"
    */
     describe("New feed Selection", function() {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed_1_ID = 1;
        var feed_2_ID = 2;
        var content_feed_1;
        var content_feed_2;
        beforeEach(function (done) {
            // If the first feed is loaded, save content from feed 1
            // and load the second feed
            loadFeed(feed_1_ID, function() { 
                content_feed_1 = $('.feed .entry h2').text();
                
                // The second feed is finished loading.
                // Save this content 2 and call 'done.'
                loadFeed(feed_2_ID, function(){
                    content_feed_2 = $('.feed .entry h2').text();  
                    done();
                });
            });
        });
        it("when a new feed is loaded by the loadFeed function the content actually changes", function(done) {
            //Testing to make sure the 2 feeds are different
            console.log(content_feed_1);
            console.log(content_feed_2);
            expect(content_feed_1).not.toBe(content_feed_2);
            done(); 
        });
      });
}());
