This is a complete chatting application with REST API and socket application and frontend application in which multiple
users can chat inside a group.

--------------------------------------------------Application------------------------------------------------------------

	Applciation performs following operations:

	=>User management - 
	  Login, signup and forgot password functionality. Used nodemailer module for sending out emails such as 
	  password forgot and reset email.

	=>Chat rooms management - 
	  Any User can create a chat room. He can also delete a chat room, mark it as closed(inactive) and
	  perform basic edits such as changing the title of the chat room. When the chatroom is marked inactive,
	  user have to mark active to use it.

	=>Join chat rooms - 
	  There are two ways to join a chat room -
	  a) Via invite link - If a particular user clicks the invite link sent by another email, he will be redirected
          to that the chat room where he can join.
	  b) Via list of active chat rooms - A list of all rooms is displayed to the user. When user clicks a chat
	  room, he should see an option to join the room. Once he clicks on that join button, he should be added to that 
	  chat room. No permission is required to join a chat room. Anyone can join any active chat room.
	  All the users in chat room are informed when a new user joins/leaves the room.

	=>Message in the chat room - 
	  User is able to chat with other users of chat room in realtime. "userName is typing" just next to the title of 
	  the room gets displayed whenever any user is currently typing a message and the user is be able to view all the
	  previous chat in that room.

	=>Kick from Chat room -
	  Any member of that chatroom can kick or remove other memebrs in that chatroom.(Kick button is available on 
	  navbar)

	=>Sending Invites -
	  User can send invites to multiple users to join the chatroom.(Invite button is available on navbar)

	=>Profile View -
	  When clicked on profile pic, user is redirected to his profile update page. But that's not working, as 
	  application has only database linked. No storage available.

	=>Sidebar -
	  Displays list of online users and all rooms.

	=>Chat Window -
	  User can only send Text Messages(No smileys, No media, No attachments)

	=>User can reset his pasword using forgot password option available at signIn. User is sent a reset link to his 
	  registered email id and which redirects to reset page. On Confirmation user receives email for password 
	  successfully resest.

	For REST API routes and events see documentation.

-------------------------------------------------------------------------------------------------------------------------- 