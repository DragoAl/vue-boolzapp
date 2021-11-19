// Milestone 1
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// ● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// ● Click sul contatto mostra la conversazione del contatto cliccato 

// Milestone 3
// ● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 5 - opzionale
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

var app = new Vue ( {
    
    el:'#container',
    data : {
        activeChat: 0,
        activeMessage:-1,
        newMessage: {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: '',
            status:'sent'
        },
        userSearch : '',

        contacts : [
            {
                name: 'Michele',
                avatar: 'img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent' 
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    },
                ]

            },
            {
                name: 'Fabio',
                avatar: 'img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    },
                ]
            },
            {
                name: 'Samuele',
                avatar: 'img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    },
                    
                ]
            },
            {
                name: 'Luisa',
                avatar: 'img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ]
            }
        ]
    },

    methods: {
        selectedChat: function(index) {
            this.activeChat = index
            this.activeMessage = -1
            if(this.activeChat !== index){
              this.contacts[index].visible = false
            } else {
              this.contacts[index].visible = true

            }
                     
        },

        addMessage: function(index) {
            let thisContact=this.contacts[index];
            
            if (this.newMessage.text !== '' ){
                thisContact.messages.push(this.newMessage);
                this.newMessage = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: '',
                status:'sent'};
                
                setTimeout(() => {
                    thisContact.messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'ok',
                        status:'received'

                    });
                    
                },1000);
            }
            console.log(thisContact.messages);
        },

        selectedMessage: function(index){
            
            if(this.activeMessage == index) {
                this.activeMessage = -1

            } else {
                this.activeMessage = index
            }

        },

        deleteMessage: function(index){
            this.contacts[this.activeChat].messages.splice(index, 1);
            console.log(this.contacts[this.activeChat].messages);
        },

        getLastAccess: function() {
            let receivedEmpty = 'Non disponibile'
            let messagesCurrentChat = this.contacts[this.activeChat].messages;
            // filtro i messaggi della chat corrente prendendo solo quelli ricevuti
            let filteredMessages = messagesCurrentChat.filter(message => message.status === 'received')
            
            if(filteredMessages != 0) {
                // seleziono l'ultimo dei messaggi ricevuti e prendo la data
                return filteredMessages.at(-1).date

            } else {
                // se non ci sono messaggi ricevuti, ritorno "non disponibile"
                return receivedEmpty
            }
        }
    }
}

)
// capire perchè così non va
// setTimeout( function(){
//     this.contacts[this.active].messages.push(this.replyMessage)
// },1000);

