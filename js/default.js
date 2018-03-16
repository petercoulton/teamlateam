(($, _) => {
  $(() => {
    const url = "http://c1-qa.adis.ws/v1/content/cmslabs/content-item/0cc6e904-1922-41d6-8cc6-163c9a2d1e67?template=lateam&returnInlinedContent=true"
    $.ajax({url}).done(response => {
      // content.segment
      const data = response.segments;
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
      const isHome = Boolean($('#home').length);
      const gender = _.maxBy(persona.segments.gender, 'count');
      const type = _.maxBy(persona.segments.type, 'count');
      const genderType = `${type.value}-${gender.value}`;
      const content = _.chain(data).find({segment: genderType}).get('content').value();
      if(content) {
        
      }
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
          {value: 'men', count: 1},
          {value: 'women', count: 1}
        ],
        type: [
          {value: 'sport', count: 1},
          {value: 'casual', count: 1}
        ]
      }, segments);
    }
  }
})(jQuery, _);