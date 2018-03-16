(($, _) => {
  $(() => {
    const url = "http://c1-qa.adis.ws/v1/content/cmslabs/content-item/53750cf8-f09a-43e0-9ddc-5a890d40ece0?template=lateam&returnInlinedContent=true"
    $.ajax({url}).done(response => {
      // content.segment
      const content = response.content.segments;
      // Get customer persona
      const segments = JSON.parse(localStorage.getItem('segments'));
      const persona = new Persona(segments);
      const pageSegments = $('body').data('segments');
      for(let segment in pageSegments) {
        const options = pageSegments[segment];
        options.forEach(value => {
          _.find(persona.segments[segment], {value}).count++;
        })
      }
      localStorage.setItem('segments', JSON.stringify(persona.segments));

      // Choose content
      const gender = _(persona.segments.gender).values().max();
      const type = _.max(persona.segments.type);
      const genderType = `${gender}-${type}`;



    });
  });

  class Persona {
    get segments() {
      return this._segments;
    }
    set segments(segments) {
      this._segments = segments;
    }
    constructor(segments) {
      this.segments = Object.assign({
        gender: [
          {value: 'male', count: 1},
          {value: 'female', count: 1}
        ],
        type: [
          {value: 'sports', count: 1},
          {value: 'casual', count: 1}
        ]
      }, segments);
    }
  }
})(jQuery, _);