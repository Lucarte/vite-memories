import http from "./http";

// MEMORIES
export const getAllMemories = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	try {
		const res = await http.get("/memories");

		if (res.status !== 200) {
			throw new Error("Failed to fetch memories");
		}

		return res.data.Memories || [];
	} catch (error) {
		console.error("Error fetching memories:", error);
		throw error; // This will be caught by react-router-dom and trigger the errorElement
	}
};

// // MEMORY BY TITLE
// export const getMemoryByTitle = async (params) => {
// 	await new Promise((resolve) => setTimeout(resolve, 1000));

// 	try {
// 		const { title } = params;
// 		const res = await http.get(`/memories/${title}`);

// 		if (res.status !== 200) {
// 			throw new Error(`Failed to fetch memory with title: ${title}`);
// 		}

// 		return res.data || {};
// 	} catch (error) {
// 		console.error(`Error fetching memory with title:`, error);
// 		throw error; // This will be caught by react-router-dom and trigger the errorElement
// 	}
// };

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
