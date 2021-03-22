package com.pistachio.restservice.main;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

/**
 * Class that holds all data for a player in the Pistachio game
 * 
 * @author igtampe
 */
public class Player {

	// -[Fields]--------------------------------------------------------------------------------------------------------

	/**
	 * The ID for theDB
	 */
	@Id
	private String _ID;

	/**
	 * The user of this player
	 */
	private String user;

	/**
	 * The pass of this player.
	 */
	private String pass;

	/**
	 * Status of this player (Online, Offline, In Battle)
	 */
	private PlayerStatus status = PlayerStatus.Offline;

	/**
	 * Collections of monsters this player has
	 */
	private List<Object> collections = new ArrayList<Object>(); //TODO: Switch this to the collections object when complete

	/**
	 * List of players who are friends with this player
	 */
	private List<Player> confirmedFriends = new ArrayList<Player>();

	/**
	 * List of players who have requested this player's friendship.
	 */
	private List<Player> friendRequests = new ArrayList<Player>();

	/**
	 * List of IDs of tasks that this player has completed. Should be cleared when
	 * new tasks are made available
	 */
	private List<String> completedTasks = new ArrayList<String>();

	/**
	 * List of batles this player is currently in.
	 */
	private List<Battle> battles = new ArrayList<Battle>();

	/**
	 * Amount of pistachios the user has
	 */
	private int pistachios=0;

	/**
	 * ID of the battle this player is in. If the ID is blank, null, or empty, then
	 * this player isn't in battle
	 */
	private String battleID="";

	// -[Getters/Setters]--------------------------------------------------------------------------------------------------------

	public String getUser() {
		return this.user;
	}

	public String getPass() {
		return this.pass;
	}
	public PlayerStatus getStatus() {return status;}
	public List<Object> getCollections() {return collections;}
	public List<String> getCompletedTasks() {return completedTasks;}
	public List<Battle> getBattles() {return battles;}
	public int getPistachios() {return pistachios;}
	public List<Player> getConfirmedFriends(){return confirmedFriends;}
	public List<Player> getFriendRequests(){return friendRequests;}
	public String getBattleID() {return battleID;}
	public void setUser(String user) {this.user = user;}
	public void setPass(String pass) {this.pass = pass;}
	public void setConfirmedFriends(List<Player> confirmedFriends){this.confirmedFriends = confirmedFriends;}
	public void setFriendRequests(List<Player> friendRequests){this.friendRequests = friendRequests;}
	public void setStatus(PlayerStatus status) {this.status = status;}
	public void setCollections(List<Object> collections) {this.collections = collections;}
	public void setCompletedTasks(List<String> completedTasks){this.completedTasks = completedTasks;}
	public void setBattles(List<Battle> battles) {this.battles = battles;}
	public void setPistachios(int pistachios) {this.pistachios = pistachios;}
	public void setBattleID(String battle) {this.battleID=battle;}
	public void setBattle(Battle b) {this.battleID=b.getId();}

	// -[Constructors]--------------------------------------------------------------------------------------------------------

	public Player() {
		this.user = "";
		this.pass = "";
	}

	/**
	 * Creates a player with default values on everything
	 * 
	 * @param User
	 */
	public Player(String user) {
		this.user = user;
		this.pass = "";
		// this._ID = "";
	}

	/**
	 * Creates a player with pass for authentication. <b>THIS USER MUST ONLY BE
	 * USED FOR AUTHENTICATION</b>
	 * 
	 * @param User
	 * @param Pass
	 */
	public Player(String user, String pass) {
		this.user = user;
		this.pass = pass;
		// this._ID = "";
	}

	// -[Methods]--------------------------------------------------------------------------------------------------------

	/**
	* Check if the player is in a battle
	* @return battleID!=""
	*/
	public boolean inBattle() {return battleID!="";}

	/**
	* Clears the battleID. Essentially, makes this player no longer in battle.
	*/
	public void clearBattle() {battleID="";}

	/**
	* Checks that the provided pass is the same as this user's pass
	* @param pass Pass to check
	* @return True if and only if the pass matches the one held in this
	player
	*/
	public boolean checkPass(String pass) {
		if(this.pass==null) {throw new IllegalStateException("This user isn't meant for authentication purposes");}
		return pass.contentEquals(this.pass);
	}

	/**
	* Clears the pass of this user in memory. <b>MUST BE USED BEFORE SENDING
	PLAYER THROUGH NETWORK</b>
	*/
	public void clearPass() {pass=null;}

	/**
	* Adds given player P to the pending friends list of this player. Player P
	<b>must not</b> already be a friend OR have sent a request.
	* @param p Player who is requesting friendship
	*/
	public void requestFriendship(Player p) {
		if(confirmedFriends.contains(p)) {throw new IllegalArgumentException("Player " + p.getUser() + " is already friends with this player!");}
		if(friendRequests.contains(p)) {throw new IllegalArgumentException("Player " + p.getUser() + " has already requested frienship.");}
		friendRequests.add(p);
	}

	/**
	* Accepts friendship request from the given player P (Who <b>must</b> be in
	the pending friends list). Adds this player to Player P's confirmed friends
	list
	* @param p
	*/
	public void acceptFriendship(Player p) {
		if(!friendRequests.contains(p)) {throw new IllegalArgumentException("Player "+ p.getUser() + " is not in the pending friends list");}
		friendRequests.remove(p);
		confirmedFriends.add(p);
		p.confirmedFriends.add(this);
	}

	/**
	* Declines friendship request from the given player P (Who <b>must</b> be in
	the pending friends list).
	* @param p
	*/
	public void declineFriendship(Player p) {
		if(!friendRequests.contains(p)) {throw new IllegalArgumentException("Player "+ p.getUser() + " is not in the pending friends list");}
		friendRequests.remove(p);
	}

	/**
	* Removes player P from this player's friend list. Player P <b>must</b> be in the confirmed friends list.
	* @param p
	*/
	public void removeFriend(Player p) {
		if(!confirmedFriends.contains(p)) {throw new IllegalArgumentException("Player" + p.getUser() + " is not friends with this player");}
		confirmedFriends.remove(p);
		p.confirmedFriends.remove(this);
	}

	/**
	* Adds the specified amount P to the pistachios this player has (can be
	negative to charge pistacios)
	* @param p
	*/
	public void addPistachio(int p) { this.pistachios+=p;}

	/***
	* Adds monster M to the default collection of this player
	* @param m
	*/
	public void addMonster(Monster m) {
	//TODO: actually code this.
	}

	/**
	* Marks provided task t as complete.
	* @param t
	*/
	public void markTaskComplete(Task t) {
		if(completedTasks.contains(t.get_ID())) {throw new IllegalArgumentException("Player has already completed task " + t.getName());}
		completedTasks.add(t.get_ID());
	}

	/**
	* Checks if task T is in the list of completed tasks.
	* @param t
	*/
	public boolean hasTaskCompleted(Task t) {return completedTasks.contains(t.get_ID());}

	/**
	* Clears completed tasks. Should be done once new tasks are available.
	*/
	public void clearCompletedTasks() {completedTasks.clear();}

	/**
	* Adds given battle B to the list of battles this player is in
	* @param b
	*/
	public void addBattle(Battle b) {battles.add(b);}

	/**
	* Removes given battle B from the list of battles this player is in
	* @param b
	*/
	public void removeBattle(Battle b) {battles.remove(b);}

	/**
	* Compares this player with another object. Returns true if and only if the
	other object is a player, and their user is the same as this one's
	*/
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {return true;}
		if (!(obj instanceof Player)) {return false;}
		Player other = (Player) obj;
		return user.contentEquals(other.user);
	}

	/**
	* Returns the player's user. For debugging purposes.
	*/
	@Override
	public String toString() {return "Player [User=" + user + "]";}

	/**
	 * @return the _ID
	 */
	public String get_ID() {
		return this._ID;
	}

	/**
	 * @param _ID the _ID to set
	 */
	public void set_ID(String _ID) {
		this._ID = _ID;
	}

}
