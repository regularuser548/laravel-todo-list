<?php

namespace App\Http\Controllers;

use App\Models\Note;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class NotesController extends Controller
{
    public function index(){

        return Inertia::render('MainPage', ['notes' => Note::all()->where("user_id", Auth::id())]);
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function update(string $id)
    {
        $model = Note::find(request('id'));

        if ($model != null && $model->user_id == Auth::id()) {
            return Inertia::render('Edit', ['note' => $model]);
        }

        return Inertia::render('Edit');//TODO find proper 404 page
    }

    public function updateStore(Request $request): void
    {
        $request->validate(['id'=>'required',
            'title'=>'required|min:1|max:50',
            'body'=>'required|min:1|max:500',]);

        $model = Note::find(request('id'));

        if ($model != null && $model->user_id == Auth::id()) {
            $model->title = request('title');
            $model->body = request('body');
            $model->save();
        }

    }

    public function store(Request $request): void
    {
        $request->validate(['title'=>'required|min:1|max:50',
                            'body'=>'required|min:1|max:500',]);
        Note::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->body
        ]);
    }
}
