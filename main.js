// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Create a factory function for organism objects
const pAequorFactor = (uNum, dnaArray) => {
  return {
    specimenNum: uNum,
    dna: dnaArray,
    // Mutate organism dna
    mutate() {
      // generate a random index and random base
      let randIndex = Math.floor(Math.random()*this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase){
        newBase = returnRandBase();
      }
      // put the new mutated base back into the array
      this.dna[randIndex] = newBase;
    },
    // Compare two organisms
    compareDNA(otherDNA) {
      let matches = 0;
      for(let i=0; i<this.dna.length; i++){
        if(this.dna[i] === otherDNA.dna[i]){
          matches += 1;
        };
      }
      const precentage = matches / this.dna.length * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherDNA.specimenNum} have ${precentage.toFixed(0)}% DNA in common`);
    },
    // Calculate organism survival liklihood
    willLikelySurvive(){
      let counter = 0;
      this.dna.forEach(base => {
        if(base === 'C' || base === 'G') {
          counter+=1;
        }
      });
      const precentage = counter / this.dna.length * 100;
      return precentage >= 60;
    }
  };
};

// Create an array of 30 organisms with high survival chances
const jellyArray = [];
while(jellyArray.length < 30) {
  let organismNum = jellyArray.length + 1;
  let strand = mockUpStrand();
  const organism = pAequorFactor(organismNum, strand);
  if (organism.willLikelySurvive()) {
    jellyArray.push(organism);
  };
};
