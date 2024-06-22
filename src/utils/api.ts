// Working with fetch

const API_URL = "http://localhost/api/auth";

// "http://localhost:5173/memories"
export const getAllMemoriesThenChain = () => {
	// const data = fetch(API_URL + "/memories").then((response) => {
	// 	if (!response.ok) {
	// 		throw response;
	// 	}
	// 	return response.json();
	// });
	// return data;
};

export const getAllMemories = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const response = await fetch(API_URL + "/memories");

	if (!response.ok) throw response;

	return response.json();
};

//  Route::controller()->middleware('auth:sanctum')->group(function () {
//         Route::post('/logout', [AuthController::class, 'logout']);

//         Route::controller(MemoryController::class)->group(function () {
//             Route::get('/memories', 'index');
//             Route::get('/memory/{title}', 'show');
//             Route::get('/memories/{kid}', 'index');
//             Route::post('/memory', 'createWithFile');
//             Route::patch('/memory/{title}', 'update');
//             Route::delete('/memory/{title}', 'delete');
//             // Route to fetch categories
//             Route::get('/categories', 'getCategories');
//         });
//         Route::get('/categories', [MemoryController::class, 'getCategories']);

//         Route::controller(CommentController::class)->group(function () {
//             Route::post('/memory/{title}/comment', 'create');
//             Route::patch('/memory/{title}/comment/{id}', 'update');
//             Route::delete('/memory/{title}/comment/{id}', 'delete');
//         });

//         Route::controller(FileController::class)->group(function () {
//             Route::get('/file/{id}', 'show')->whereNumber('id');
//             Route::delete('/file/{id}', 'delete')->whereNumber('id');
//             // Route::patch('/file/{id}', 'update')->whereNumber('id'); // PATCH not working
//             Route::post('/file/{id}', 'update')->whereNumber('id');
//         });

//         Route::controller(UrlController::class)->group(function () {
//             Route::get('/url/{id}', 'show')->whereNumber('id');
//             Route::delete('/url/{id}', 'delete')->whereNumber('id');
//             Route::patch('/url/{id}', 'update')->whereNumber('id');
//         });

//         // ADMIN & profile owners
//         Route::controller(UserController::class)->group(function () {
//             // Only 'admin' (set manually on DB) can see the fans list
//             Route::get('/fans', 'index');

//             // Only 'admin' or owner can update their info and if need be, delete profile
//             Route::get('/fan/{id}', 'getById');
//             Route::patch('/fan/{id}', 'update');
//             Route::delete('/fan/{id}', 'delete');
