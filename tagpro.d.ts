declare module 'tagpro' {
	var tagpro: TagPro.TagProStatic;
	export default tagpro;
}

declare namespace TagPro {
	interface TagProStatic {
		disableControls: boolean;
		music: boolean;
		resourcesLoaded: boolean;
		sound: boolean;
		spectator: boolean;

		gameSocket: any;
		host: string;
		musicHost: string;
		rawSocket: SocketIO.Socket;
		serverHost: string;
		serverPort: number;
		socket: Socket;
		socketHost: string;
		socketPort: number;

		events: Events;
		helpers: Helpers;
		keys: Keys;
		objects: { [id: string]: PIXI.DisplayObjectContainer };
		particleDefinitions: ParticleDefinitions;
		players: { [id: string]: Player };
		settings: Settings;
		soundTiles: SoundTiles;
		teamNames: { blueTeamName: string; redTeamName: string; };
		tiles: Tiles;

		floorMap: Array<Array<number>>;
		map: Map;
		wallMap: Array<Array<Array<number|string>>>;

		chat: Chat;
		fps: number;
		gameEndsAt: Date;
		group: Group;
		kick: Kick;
		musicPlayer: MusicPlayer;
		ping: Ping;
		playerId: number;
		renderer: Renderer;
		score: { b: number; r: number; };
		spectators: number;
		state: State;
		ui: UI;
		version: string;
		viewport: Viewport;
		volume: number;
		world: World;
		zoom: number;
		zooming: number;

		TILE_SIZE: number;

		ready: {
			(callback): void;
			after(callback): void;
		};

		createSocket(): Socket;
		joinGame(): void;
		playSound(name): void;
		sendKeyPress(direction: string, released: boolean): void;
		showOptions(): void;
		stopSound(sound: string): void;
		updateSounds(): void;
	}

	interface Chat {
		resize(): void;
	}

	interface Events {
		register();
	}

	interface Helpers {
		pad(str): string;
		timeFromSeconds(seconds: number): string;
	}

	interface Group {
		socket: SocketIO.Socket;
	}

	interface Keys {

	}

	interface Kick {
		clickBall(): void;
		player(player): void;
	}

	interface Layers {
		background: PIXI.DisplayObjectContainer;
		foreground: PIXI.DisplayObjectContainer;
	}

	interface Map extends Array<Array<number|string>> {
		splats: Array<{x: number, y: number, t: number}>;
	}

	interface MusicPlayer {
		current;
		keyBindings: Object;
		list: Array<any>;
		mute();
		next();
	}

	interface Options {
		disableParticles: boolean,
		forceCanvasRenderer: boolean,
		disableViewportScaling: boolean,
		transparent: boolean
	}

	interface ParticleDefinition {
		alpha: { start: number, end: number };
		scale: { start: number, end: number, minimumScaleMultiplier: number };
		color: { start: string, end: string };
		speed: { start: number, end: number };
		acceleration: { x: number, y: number };
		startRotation: { min: number, max: number };
		rotationSpeed: { min: number, max: number };
		lifetime: { min: number, max: number };
		blendMode: string;
		frequency: number;
		emitterLifetime: number;
		maxParticles: number;
		pos: Position;
		addAtBack: boolean;
		spawnType: string;
		spawnCircle: { x: number, y: number, r: number };
	}

	interface ParticleDefinitions {
		death: ParticleDefinition;
		explosion: ParticleDefinition;
		gravityWell: ParticleDefinition;
		playerEmitter: ParticleDefinition;
		rollingBomb: ParticleDefinition;
		tagproSparks: ParticleDefinition;
	}

	interface Ping {
		avg: number;
		current: number;
		history: Array<number>;
		loss: number;
	}

	interface Player {
		flag: number;
		degree: number;
		sprites: { degrees: PIXI.Sprite, info: PIXI.Sprite };
	}

	interface Position {
		x: number;
		y: number;
	}

	interface Settings {
		stats: boolean;
		ui: {
			allChat: boolean;
			degrees: boolean;
			groupChat: boolean;
			matchState: boolean;
			names: boolean;
			performanceInfo: boolean;
			spectatorInfo: boolean;
			systemChat: boolean;
			teamChat: boolean;
			teamNames: boolean;
		};
	}

	interface Socket {
		on(eventName, callback);
		emit(eventName, ...items);
	}

	interface SoundTiles {
		alert;
		alertLong;
		burst;
		burstOther;
		cheering;
		countdown;
		degreeup;
		drop;
		dynamite;
		dynamiteOther;
		friendlyalert;
		friendlydrop;
		go;
		pop;
		popOther;
		portal;
		portalOther;
		powerup;
		powerupOther;
		rolling;
		rollingOther;
		sigh;
		switchOff;
		switchOffOther;
		switchOn;
		switchOnOther;
		teleport;
		teleportOther;
	}

	enum State {
		Active = 1,
		Ended = 2,
		NotStarted = 3
	}

	interface Tiles {
		draw(container: PIXI.DisplayObjectContainer, tile: string|number, position: Position, width: number, height: number): void;
		drawLayers(container, x, y, position, container2): void;
		getTexture(tileId): void;

		splats: {
			red: Array<PIXI.Sprite>;
			blue: Array<PIXI.Sprite>;
		};
	}

	interface UI {
		blueFlagTaken: boolean;
		redFlagTaken: boolean;
		yellowFlagTakenByRed: boolean;
		yellowFlagTakenByBlue: boolean;
		bluePotatoTaken: boolean;
		redPotatoTaken: boolean;
		yellowPotatoTakenByRed: boolean;
		yellowPotatoTakenByBlue: boolean;

		enabled: boolean;
		// flags;
		// sprites: Object;

		alignUI(): void;
		largeAlert(): void;
		performanceInfo(): void;
		resize(width: number, height: number): void;
		scores(): void;
		spectatorInfo(): void;
		timer(): void;
		update(): void;
		updateFlags(): void;
	}

	interface Viewport {
		followPlayer: boolean;
		centerLock: boolean;
		source: Position;

		setAudioPosition();
		setAudioVelocity();
	}

	interface World {
		createGravityWell(x, y): void;
		destoryPlayer(playerId): void;
		syncObject(): void;
		syncPlayer(): void;
		update(): void;
	}

	interface Renderer {
		options: Options;
		drawStartingSplats(): void;
		particleDefinitions: ParticleDefinitions;

		canvas: HTMLCanvasElement;
		canvas_height: number;
		canvas_width: number;
		stage: any;

		vpWidth: number;
		vpHeight: number;

		debug: boolean;

		/**
		 * Holds all map elements that we want to be able to update.
		 */
		dynamicSprites: Object;

		/**
		 * A list of all particle emitters for efficient updating.
		 */
		emitters: Array<any>;

		/**
		 * A list of explosions, but only if particles are turned off.
		 */
		explosions: Array<PIXI.Graphics>;

		/**
		 * A list of splats that should be fading away over time.
		 */
		fadingSplats: Array<any>;

		frameCount: number;

		/**
		 * A list of recent frame rates (calculated from tr.renderDelta) used to calculate
		 */
		frameRates: Array<number>;

		/**
		 * Holds all PIXI.DisplayObject instances that represent various layers of the playing field from background to UI.
		 */
		layers: Layers;
		zoomThreshold: number;

		addPlayerSprite(player): void;

		addSplat(team, x, y, fadeAway): void;

		addStatePlayer(sprite): void;

		centerCameraPosition(): void;

		centerContainerToPoint(x, y): void;

		/**
		 * Centers the canvas and canvasDiv. Resizes canvasDiv if necessary.
		 */
		centerView(): void;

		checkIfVisible(): boolean;

		checkSelfDestruct(player): void;

		chunkifyBackground(renderTexture): void;

		/**
		 * Removes all children from the background.
		 */
		clearBackground(): void;

		createBackground(): void;

		createBackgroundTexture(container): void;

		createBallSprite(player): void;

		createExplosion(x, y): void;

		/**
		 * Creates the foreground DisplayObjectContainer and appends itself to the specified container.
		 */
		createForeground(container): void;

		createGameContainer(stage): PIXI.DisplayObjectContainer;

		createGravityWellEmitter(x, y): void;

		/**
		 * Creates all PIXI.DisplayObjectContainers which we'll shove all of the sprites into.
		 */
		createLayers(): void;

		/**
		 * Layer creation functions.
		 */
		createMidground(): void;

		/**
		 * Creates the overlay DisplayObjectContainer and appends itself to the specified container.
		 * @param container {PIXI.DisplayObjectContainer} The container to put the foreground in.
		 */
		createOverlay(container): void;

		createParticle(selector): PIXI.Texture;

		createPlayerEmitter(player): void;

		createPlayerSprite(player): void;

		/**
		 * Creates the renderer. Currently this only uses the autoDetectRenderer,
		 * though we'll allow settings to select a specific renderer.
		 */
		createRenderer(): PIXI.PixiRenderer;

		createUI(): void;

		/**
		 * Destroys a player's sprites.
		 */
		destroyPlayer(player: Player): void;

		drawAnimation(tile, drawPos): PIXI.MovieClip;

		drawBackground(): void | boolean;

		/**
		 * Draws all background tiles into the specified container.
		 */
		drawBackgroundTiles(container: PIXI.DisplayObjectContainer): void;

		drawBallPop(x, y, team): void;

		drawDegree(player): void;

		drawDynamicTile(x, y): void;

		drawDynamicTiles(): void;

		drawFlair(player): void;

		/**
		 * Draws the marsball sprite if it doesn't already exist.
		 *
		 * @param object {object} The marsball object created by
		 * @param position {object} A simple object vector. x and y.
		 */
		drawMarsball(object, position: Position): void;

		drawName(player, forceRedraw): void;

		drawPlayer(player): Position;

		drawPlayers(context): void;

		drawSpawn(x: number, y: number, team: number, timeout: number): void;

		drawSplat(x: number, y: number, team: number, showDeath: boolean, fadeAway: boolean): void;

		drawStartingSplats(): void;

		getFlairTexture(cacheKey, flair): PIXI.Texture;

		getLockedPosition(player): Position;

		handleMapUpdate(data: Array<Position>): void;

		largeText(text, color): PIXI.Text;

		/**
		 * Measures the time delta between two frames and pushes the instantaneous
		 * framerate to an array. If there are framerates in the tr.frameRates array,
		 * compute an actual FPS and assign it to fps.
		 */
		measurePerformance(): void;

		prettyText(text, color): PIXI.Text;

		/**
		 * Simple check to see whether we're ready to draw the background.
		 */
		readyToDrawBackground(): boolean;

		/**
		 * The main function. Calls all applicable functions which then
		 * render the screen.
		 */
		render(): void;

		resetFlagStatuses(): void;

		/**
		 * Resizes the canvas, and centers both it and the enclosing div.
		 */
		resizeAndCenterView(): void;

		/**
		 * Resizes the canvas contained under the renderer.
		 */
		resizeView(): void;

		/**
		 * Displays an opening console message.
		 */
		sayHello(): void;

		setupPlayerSprites(player): void;

		/**
		 * Starts the renderer and rendering loop.
		 */
		start(): void;

		startDeathEmitter(startColor, stopColor, x, y): void;

		updateBackgroundVisibility(): void;

		updateCamera(id): void;

		updateCameraPosition(player): void;

		updateCameraZoom(): void;

		updateDeathStatus(player, drawPos): void;

		updateEmitters(): void;

		updateExplosions(): void;

		updateFadingSplats(): void;

		updateFlagsFromPlayer(player): void;

		updateGraphics(): void;

		updateGrip(player, context, drawPos): void;

		updateMarsBall(object, position): void;

		updateObjects(): void;

		updatePlayer(player): void;

		updatePlayerColor(player): void;

		updatePlayerEmitter(player): void;

		updatePlayerFlag(player): void;

		updatePlayerPowerUps(player, context, drawPos): void;

		updatePlayerSpritePosition(player): void;

		updatePlayerVisibility(player): void;

		updatePlayers(): void;

		updateRollingBomb(player): void;

		updateTagpro(player): void;

		updatedynamicTile(update: Position): void;

		veryPrettyText(text, color): PIXI.Sprite;
	}
}
