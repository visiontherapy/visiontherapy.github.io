let quotes = `After fighting off the alligator, Brian still had to face the anaconda
A glittering gem is not enough
All she wanted was the answer, but she had no idea how much she would hate it
All they could see was the blue water surrounding their sailboat
Although it wasn't a pot of gold, Nancy was still enthralled at what she found at the end of the rainbow
Always bring cinnamon buns on a deep-sea diving expedition
Art doesn't have to be intentional
A song can make or ruin a person’s day if they let it get to them
As she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts
A suit of armor provides excellent sun protection on hot days
Dan ate the clouds like cotton candy
Dan took the deep dive down the rabbit hole
Don't put peanut butter on the dog's nose
Don't step on the broken glass
Doris enjoyed tapping her nails on the table to annoy everyone
For some unfathomable reason, the response team didn't consider a lack of milk for my cereal as a proper emergency
For the 216th time, he said he would quit drinking soda after this last Coke
Gary didn't understand why Doug went upstairs to get one dollar bills when he invited him to go cow tipping
Going from child, to childish, to childlike is only a matter of time
Gwen had her best sleep ever on her new bed of nails
He created a pig burger out of beef
He decided water-skiing on a frozen lake wasn’t a good idea
He excelled at firing people nicely
He felt that dining on the bridge brought romance to his relationship with his cat
He found a leprechaun in his walnut shell
He had accidentally hacked into his company's server
He had a hidden stash underneath the floorboards in the back room of the house
He had decided to accept his fate of accepting his fate
He hated that he loved what she hated about hate
He is good at eating pickles and telling women about his emotional problems
He played the game as if his life depended on it and the truth was that it did
He ran out of money, so he had to stop playing poker
He set out for a short walk, but now all he could see were mangroves and water were for miles
He was all business when he wore his clown suit
His confidence would have bee admirable if it wasn't for his stupidity
I am never at home on Sundays
I covered my friend in baby oil
I hear that Nancy is very pretty
Imagine his surprise when he discovered that the safe was full of pudding
I met an interesting turtle while the song on the radio blasted away
It didn't make sense unless you had the power to eat colors
It didn't take long for Gary to detect the robbers were amateurs
It was the best sandcastle he had ever seen
I would be delighted if the sea were full of cucumber juice
Jerry liked to look at paintings while eating garlic ice cream
Jim liked driving around town with his hazard lights on
Most shark attacks occur about 10 feet from the beach since that's where the people are
Nancy thought the best way to create a welcoming home was to line it with barbed wire
Nothing is as cautiously cuddly as a pet porcupine
On a scale from one to ten, what's your favorite flavor of random grammar?
Pat ordered a ghost pepper pie
People generally approve of dogs eating cat food but not cats eating dog food
Please put on these earmuffs because I can't you hear
Please wait outside of the house
Random words in front of other random words create a random sentence
Seek success, but always be prepared for random cats
She couldn't decide of the glass was half empty or half full so she drank it
She learned that water bottles are no longer just to hold liquid, but they're also status symbols
She wanted to be rescued, but only if it was Tuesday and raining
She was only made the society president because she can whistle with her toes
Situps are a terrible way to end your day
Smoky the Bear secretly started the fires
Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive, and what is this all about?
Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind
The beauty of the sunset was obscured by the industrial cranes
The bread dough reminded her of Santa Clause’s belly
The changing of down comforters to cotton bedspreads always meant the squirrels had returned
The estate agent quickly marked out his territory on the dance floor
The glacier came alive as the climbers hiked closer
The hand sanitizer was actually clear glue
Their argument could be heard across the parking lot
The lake is a long way from here
The newly planted trees were held up by wooden frames in hopes they could survive the next storm
The paintbrush was angry at the color the artist chose to use
There's a reason that roses have thorns
There was no ice cream in the freezer, nor did they have money to go to the store
There were three sphered rocks congregating in a cubed room
The small white buoys marked the location of hundreds of crab pots
The stranger officiates the meal
The teenage boy was accused of breaking his arm simply to get out of the test
The three-year-old girl ran down the beach as the kite flew behind her
The toy brought back fond memories of being lost in the rain forest
The two walked down the slot canyon oblivious to the sound of thunder in the distance
The white water rafting trip was suddenly halted by the unexpected brick wall
They ran around the corner to find that they had traveled back in time
Today I heard something new and unmemorable
Today is the day I'll finally know what brick tastes like
Various sea birds are elegant, but nothing is as elegant as a gliding pelican
Watching the geriatric men’s softball team brought back memories of 3 yr olds playing t-ball
We're careful about orange ping pong balls because people might think they're fruit
When he asked her favorite number, she answered without hesitation that it was diamonds
When I cook spaghetti, I like to boil it a few minutes past al dente so the noodles are super slippery
When nobody is around, the trees gossip about the people who have walked under them
When she didn’t like a guy who was trying to pick her up, she started using sign language
You can't compare apples and oranges, but what about bananas and plantains?`.split("\n").filter((q) => { return q.length < 50; });
function getquote() {
  return quotes[Math.floor(Math.random() * quotes.length)];

}




async function quoteapi(url = "https://api.quotable.io") {
  return fetch(url,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain"
      }
    }
  ).then((resp) => {
    console.log(resp);
    return resp.text();

  })
    .then((text) => {
      // console.log(text);
      return text; //(text);
    })
    // .then(thing => {
    //     console.log(thing);
    //   })
    .catch(e => console.log(e));
}

/*
let bounce = null;// "abc";
quoteapi() //("https://visiontherapy.github.io/README.md")
.then((t) => {
bounce ??= t;
console.log("bounced", bounce);

});
*/