<?php
class Model_siswa extends CI_MOdel{

	public function tampildata(){


		return $this->db->get('biodata_siswa')->result();
	}

	public function tambah_data($data){

		$query = $this->db->insert('biodata_siswa',$data);
		return $query;
		
	}

	public function rubah_data($data, $where){

		$result = $this->db->where($where)->update('biodata_siswa',$data);
		return $result;
	}

	public function hapus_data($where){

		$delete = $this->db->where($where)->delete('biodata_siswa');
		return $delete;
	}
}