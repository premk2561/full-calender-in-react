import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction" // needed for dayClick
import { eventslist } from './Components/EventsArray'
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../node_modules/@fortawesome/css/all.css'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { formatDate } from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
import allLocales from '@fullcalendar/core/locales-all';
// import momentTimezonePlugin from '@fullcalendar/moment-timezone';
// import rrulePlugin from '@fullcalendar/rrule'

// let str = formatDate(new Date(), {
//   month: 'long',
//   year: 'numeric',
//   day: 'numeric'
// });

// console.log(str);

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: eventslist,
      lang: ''
    }
  }
  handleSelect = () => {
    let value = document.querySelector('#slct').value;
    console.log(value)
    this.setState({
      lang: value
    })
  }
  render() {
    return (
      <div style={{ margin: '5px 20px',color:'grey' }}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
            // rrulePlugin,
            // bootstrapPlugin
            // momentTimezonePlugin
          ]}
          initialView="dayGridMonth"
          events={this.state.events}
          dateClick={this.handleDateClick}
          eventContent={renderEventContent}
          headerToolbar={{
            start: 'prevYear,nextYear Button dayGridMonth,timeGridWeek,timeGridDay,dayGridDay,list', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'today prev next' // will normally be on the right. if RTL, will be on the left
          }}
          // buttonText={
          //   {
          //     today: 'Today....!',
          //     month: 'month',
          //     prev: 'previous',
          //     list: 'list',
          //     next: 'next',
          //   }
          // }
          customButtons={{
            Button: {
              text: 'custom button!',
              click: function () {
                alert('clicked the custom button!');
              },
            },
            Goto: {
              text: 'custom button!',
              click: function () {
                alert('clicked the custom button!');
              },
            },
          }}
          height={500}
          // contentHeight={500}
          // aspectRatio={5}
          // eventMinHeight={2}
          slotEventOverlap={true}
          allDaySlot={true}
          // dayCount={4}
          // weekends={false}
          // hiddenDays={[0,5]} // we can hide the day of the using this array
          dayHeaderFormat={{ weekday: 'long' }}  // we can specify the header of the using this there diffrent formats
          // slotDuration={'01:00:00'} // we set the duration of the slot
          firstDay={'1'}  // we can set wich should appear at first 
          navLinks={true}
          weekNumbers={true}
          selectable={true}  // we can select the date
          selectMirror={true}
          nowIndicator={true}  // can set the indicator for exact time in time view
          businessHours={true} // we can set the bussiness hours to the calender
          // eventBackgroundColor={'#F8485E'}
          eventColor={'#495464'} // setting event color
          eventTextColor={'white'}
          displayEventTime={true}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          eventClick={function (info) { alert(info.event.title) }}
          Draggable={true}
          editable={true}
          eventResizableFromStart={true}
          droppable={true}
          dayMaxEventRows={true}
          locale={this.state.lang}
          // eventMaxStack={5}
          locales={allLocales}
          themeSystem={'Solar'}
        // themeSystem={'bootstrap'}
        timeZone={'UTC'}
        />
        <select id='slct' onChange={this.handleSelect}>
          <option value='en'>english</option>
          <option value='bg'>bulgarian</option>
          <option value='bs'>Bosnian</option>
          <option value='af'>Afrikaans</option>
          <option value='ar'>Arabic</option>
          <option value='az'>Azerbaijani</option>
          <option value='hi'>Hindi</option>
          <option value='ta-in'>Tamil</option>
        </select>
      </div>
    )
  }
  handleDateClick = (arg) => {    // bind with an arrow function
    let eventFromPrompt = prompt(`enter an event for date : ${arg.dateStr}`)
    if ((eventFromPrompt != '') && (eventFromPrompt != null)) {
      this.setState({
        events: [...this.state.events, { title: eventFromPrompt, date: arg.dateStr }]
      })
    }
  }
}
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}