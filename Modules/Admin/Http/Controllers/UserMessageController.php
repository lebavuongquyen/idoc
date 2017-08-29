<?php

namespace Admin\Http\Controllers;

use Admin\Http\CoreController as Controller;
use Admin\Models\User;

class UserMessageController extends Controller
{
    //
    public function getLastestByUser($id , \Request $request) {
        $user = User::with('lastestMessages.from.currentAvatar')->find($id);
        if (!$user) {
            abort(404, 'Can not found the specified user!');
        }
        $this->result['data'] = $user->messages;
        return $this->result;
    }
    
    public function getLastestByCurrentUser(\Request $request) {
        return $this->getLastestByUser(\Auth::user()->id, $request);
    }
}
