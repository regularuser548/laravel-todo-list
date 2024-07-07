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
