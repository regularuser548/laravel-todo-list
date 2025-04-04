<?php

namespace App\Http\Controllers;

use App\Models\Note;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Request;

class NotesController extends Controller
{
    public function index(): Response
    {
        $notes = Note::all()->where("user_id", Auth::id())->flatten();

        return Inertia::render('MainPage', compact('notes'));

    }

    public function update(string $id, Request $request): void
    {
        $request->validate([
            'title'=>'required|min:1|max:50',
            'body'=>'required|min:1|max:500',]);

        $model = Note::find($id);

        if ($model != null && $model->user_id == Auth::id()) {
            $model->title = request('title');
            $model->body = request('body');
            $model->save();
        }

    }

    public function store(Request $request): string|false
    {
        $request->validate([
            'title'=>'max:50',
            'body'=>'max:500',]);

        $note = Note::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return json_encode(['id' =>$note->id, 'created_at' => $note->created_at, 'updated_at' => $note->updated_at]);
    }

    public function destroy(string $id): void
    {
        $note = Note::find($id);

        if ($note != null && $note->user_id == Auth::id()) {
            $note->delete();
        }
    }
}
